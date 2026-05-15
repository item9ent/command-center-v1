import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Sanitize messages to remove non-standard properties that crash the SDK
    const sanitizedMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    }));

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const result = await generateText({
      model: google('gemini-1.5-flash-latest'),
      system: `You are 'ENHAZED AI', the AI Business Assistant for this company. 
You exist within ENHAZED OS. Your goal is to help the executive team 
make data-driven decisions, draft documents, analyze risks, and manage their business operations.
Always be concise, professional, and highly intelligent.`,
      messages: sanitizedMessages,
      maxSteps: 5,
      tools: {
        getBusinessMetrics: tool({
          description: 'Get the total sales and purchase volume for the business.',
          parameters: z.object({ trigger: z.boolean().optional() }),
          // @ts-expect-error - AI SDK Tool Typing Bug
          execute: async (_args: { trigger?: boolean }) => {
            const [salesRes, purchasesRes] = await Promise.all([
              supabase.from('sales_orders').select('total_amount'),
              supabase.from('purchase_orders').select('total_amount')
            ]);
            const sales = (salesRes.data || []).reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
            const purchases = (purchasesRes.data || []).reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
            return { sales, purchases, margin: sales > 0 ? Math.round(((sales - purchases) / sales) * 100) : 0 };
          },
        }),
        getInventoryStatus: tool({
          description: 'Get the current quantity on hand for all inventory items.',
          parameters: z.object({ trigger: z.boolean().optional() }),
          // @ts-expect-error - AI SDK Tool Typing Bug
          execute: async (_args: { trigger?: boolean }) => {
            const { data } = await supabase.from('inventory_items').select('*, products(name), materials(name)');
            return data || [];
          },
        }),
        getPendingApprovals: tool({
          description: 'Get the list of pending approval requests in the system.',
          parameters: z.object({ trigger: z.boolean().optional() }),
          // @ts-expect-error - AI SDK Tool Typing Bug
          execute: async (_args: { trigger?: boolean }) => {
            const { data } = await supabase.from('approval_requests').select('*').eq('status', 'Pending');
            return data || [];
          },
        }),
      },
    });

    const allToolResults = result.steps?.flatMap(step => step.toolResults) || result.toolResults || [];

    const dbgReason = typeof result.finishReason === 'object' ? JSON.stringify(result.finishReason) : result.finishReason;
    const finalOutput = result.text || `[DEBUG: finishReason=${dbgReason}, toolCallsLength=${allToolResults.length}]`;

    return Response.json({ 
      text: finalOutput, 
      toolCalls: allToolResults 
    });
  } catch (error: any) {
    console.error('AI Route Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process AI request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
