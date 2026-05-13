-- ==========================================
-- IMPORT CUSTOMERS
-- ==========================================

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AB Bowen', 'bec@albowen.com', '6784096952', NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Arvida Labs, LLC.', 'info@arvidalabs.com', '(720) 616-9448', '1291 NW 65th Place 
Unit B, Fort Lauderdale, FL, 33309', 'Dubee');

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Becky Bowen', 'Becky@item9enterprises.com', '3862222972', '13889 121st Drive, Live Oak, Florida, 32064, United States', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'CashApp', NULL, NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Christopher Agor', 'agorx@gmail.com', NULL, '48 regent house, Brentwood, ENG, CM14 4WL, United Kingdom', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Christopher Leadingham', 'grim@wkuconsultants.com', NULL, '1700 NE Market Drive, Portland, Oregon, 97024, United States', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'D Bowen', 'dbowenpro@gmail.com', '6786402582', NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dandillion Herbals, LLC', 'felixlulu116@gmail.com', NULL, '3210 Fulton Ave., Sacramento, CA, 95821', 'WCE');

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Diesel Hemp', 'marc@dieselhemp.com', NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Eliel McKay', 'ELIEL@ITEM9ENTERPRISES.COM', NULL, '135 Warley Hill, Brentwood, ENG, CM13 3AJ, United Kingdom', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'EXCELLA EQUITY BOOKING', NULL, NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gavin Smith', NULL, NULL, '205 Stoney Lane, Birmingham, ENG, B12 8HB, United Kingdom', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Go2Distributors, LLC.', 'ammar@snipesmoke.com', '(954) 552-0181', '132 NW 20th St, Boco Raton, FL, 33431', 'WCE');

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gold Standard, LLC', 'kaya@goldcbd.com', '5418161701', '608 SE L ST., Grants Pass, OR, 97526-3208, USA', 'WCE');

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Isaiah Norville', 'zeekn36@gmail.com', NULL, '8628 Eaglewind Drive, Charlotte, NC, 28212', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Jake Balfour', 'jake.balfour@yahoo.com', NULL, '0/1 692 Cathcart Road, Glasgow, G42 8ES, United Kingdom', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'JK Food Mart', 'jaldhipatel23@gmail.com', NULL, 'Live Oak, FL, 32064, United States', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Johnny Truelove', NULL, NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Joseph Fasce', 'jstrap2024@gmail.com', NULL, '117 Gramatan Dr, Yonkers, New York, 10701, United States', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Legendary Icons International Distribution, LLC.', 'David@3Y2N.com', NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Live Oak Liquor', 'jaxkalpen@gmail.com', NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Manuel Georgiev', 'manuel.georgiev@googlemail.com', '+44757674555', '1/2 132 Dixon Avenue, Glasgow, Scotland, G42 8EL, United Kingdom', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Naveed Hussain', 'dkimbo846@gmail.com', NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Red Dragon', NULL, NULL, '7709 NW 3rd St., Oklahoma City, OK, 73127', NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Retail Customer', NULL, NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sample Customer', NULL, NULL, NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'West Coast Exotics, LLC', 'derek@item9enterpries.com', '(470) 429-8628', NULL, NULL);

INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wrapped Solutions LLC DBA Major League', 'playball@majorleaguetrees.com', '(786) 643-0205', '16250 NW 48TH AVE, Miami Lakes, FL, 33014, US', 'WCE');

-- ==========================================
-- IMPORT VENDORS
-- ==========================================

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), '420 Property', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), '7-Eleven', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ABSTRAX', NULL, NULL, '1672 Reynolds Ave, Irvine, CA, 92614');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Account Maintenance Fee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AccuScience Laboratories', NULL, '(407) 342-5755', '40 S Dewey St., Eustis, FL, 32726');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Adobe', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Advance Auto Parts', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AIMastery', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Airbnb', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AirGas Store', NULL, '(386) 755-6450', '2688 SW Main Blvd, Lake City, FL, 32025, Columbia');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AllStar', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Alma Cubana', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Amazon', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'American Airlines', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'American Express', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Ameris Bank', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Amigos', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Anthropic', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Apple', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Ar Psychiatric & Counseling', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Arby''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Arco', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Arvida Labs, LLC', 'Ar@arvidalabs.com', '(305) 322-9822', '1291 NW 65th Place
Unit B, Ft. Lauderdale, FL, 33309, US');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ATM Surcharge', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ATM Withdrawal', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Auctane', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'AutoZone', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Avis', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Badger Laboratories', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bass Pro', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Beach Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bealls', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Beast Branding', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Beef O''Brady''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Best Buy', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Best Value Vacs', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Best Western', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Better Grow Hydro', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'BFF Hemp', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Biehl & Biehl, Inc', NULL, NULL, 'PO Box 87410, Carol Stream, IL, 60188-7410');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Big Commerce', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Big Foot', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Big Lots', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Big Woods', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Blink Health', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Blue Collar Cookin', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Blue Rock Products', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bolton Tools', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Booking.Com', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Borgata', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Boveda', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bowen, Becky', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bowen, Derek', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'BP', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Brake Time', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Buc-ee''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bucs', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Bulk Supplements', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Burger King', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Busy Bee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'BVV', 'support@shopbvv.com', '(331) 281-0154', '1251 Frontenac Road
Unit 150, Naperville, IL, 60563');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Calabria Ristorant', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Candle Science', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cannabis Compliance', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Canteen Vending', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Canva', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Capital One', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Capriottis', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Carfax', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Catalina Hotel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Ceiba Botanical Distribution', 'info@ceibahemp.com', '(844) 223-8080', '146-B Weaverville Road, Ashville, NC, 28804');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cenex', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cenex Farmers', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cex.io', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Champ''s  Convention / Show', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Chelle', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ChemPoint', NULL, '(452) 892-1053', '1100 112th Ave NE
Suite 600, Bellevue, WA, 98004');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Chevron', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Chick-Fil-A', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Chili''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'China Tasty', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'CIAO IMPORTS', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Circle K', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Citgo', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'City Electric Supply', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'City of Live Oak', NULL, '(386) 262-2276', '101 SE White Avenue, Live Oak, Florida, 32064');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ClearBags', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ClickLease', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Coach', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cody Store', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cody Store #2', NULL, NULL, 'Moultrie, GA');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Colleen McGuire', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Comcast', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Comedy Clubs', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Container Packaging', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Courtyard', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Crabbie Dads Bar', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cracker Barrel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Credit Acceptance', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Csc', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Cufflinks', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Culvers', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Custom Cones USA', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'CVS', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dairy Queen', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Damian Hawkins', 'globaldirect6@gmail.com', '+15056600400', 'WY, 82001-4531');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Days Inn', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Delta', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Denny''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dept of Education Student LN', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Derrick''s BBQ', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dick''s Sporting', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dollar General', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dollar Tree', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Domino''s Pizza', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'DoorDash', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dropbox', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Dunkin Donuts', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'eBay', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'El Cazador', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Elementor', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Elfsight', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Ellianos', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Elora McGuire', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Embassy Suites', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Emily Smith', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'EnCompass Parts', NULL, NULL, 'Lawrenceville, Georgia');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Erozul', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'EsQuires', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Evin Rogers', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Excor Partners', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Expedia', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Experian', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Extract Consultants, LLC', NULL, '(888) 541-9089', '7321 Heritage Square Drive
suite 2110, Granger, IN, 46530');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Exxon', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Facebook', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fast Track', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fat Tuesday', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'FedEx', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fiddlers Restaurant', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Firehouse Subs', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'First Citizen Bank', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'First Fed Bank', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'First Watch', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'FIVERR', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'FL Dept of Agriculture', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'FL U.C. Fund', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Flavor Concentrates', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Floraplex Terpenes', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Florida Dept of Revenue', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Florida Power & Light', NULL, '(800) 375-2424', 'General Mail Facility, Miami, FL, 33188-0001');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Florida U.C. Fund', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'FlowCode PPro', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fly and Grill', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Flying J', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Foreign Fee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fratelli La Bufala', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Freddy''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Frontier Air', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fuego Azteca', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fuel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Fusion Buffet', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gateway', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gathering Cafe', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gator''s Dockside', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gelato', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Global Direct LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Global Direct, LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'GoDaddy.com', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gold Standard', 'zion@goldcbd.com', '5418161701', '608 SE L ST, GRANTS PASS, OR, 97526-3208, United States');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Google', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Grab & Go', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Green Tech Packaging', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'GreenDot', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Gulf', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Halpatter Brewing', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hampton Inn', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Happy Money', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Harbor Freight Tools', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hardee''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hause,  LLC', 'info@hauprocessing.com', '7203697355', '2200 E 76th Ave
Unite C300, Denver, CO, 80229-6628, United States');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hawkers', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'HBOMax', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Heidi Cupcakery', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hey Dude', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hibachi Express', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hilton', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hobby Lobby', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Holiday Inn', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Home Depot', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hour Farms', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Howand Hardware', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hudson Yards', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Hwy 55', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Impak', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Interest', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'InterPromo', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Intuit', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'IPS', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'IRS', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'iStar Distro LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Istore', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Italian Pizzeria', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'J K Food', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Jacksonville Aviation', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'James, Paul', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Jermonn Richards', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'JERRI JAMES', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Jiffy Food', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Kasa Living', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Kathis Krab', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'KCA Laboratories, LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Keg Room', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'KFC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Kikoff Lending, LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Krystal', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Kush.com', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'LA Rotonda', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Lake City Smoke Shop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Lakes Liquor Store', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Landry Jacobs LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Lands End', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Las Vegas Convention 23', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Las Vegas Convention Champs', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Late', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Law depot', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Law Just Answer', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Limonada', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Little Caesars', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Live Oak Investments', NULL, NULL, '116 Palm St NE, Live Oak, FL, 32064');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Live Oak Investments 140', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'LIVE OAK PACK & SHIP', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Live Oak Pest Control', NULL, '(386) 362-3887', '17856 US 129 South, McAlpin, FL, 32062');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Live Oak Smoke Shop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Lokarie', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Loves', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Lowe''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'M and M Parking', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Maddies Market', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Madison Food Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Mantis Ad Network LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Marathon', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Marco''s Pizza', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Marriott', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Marshalls', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Mass Terpenes', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Mayo Food Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'MC Nutraceuticals, PLLC', NULL, NULL, '6101 Long Prairie Road
Ste 744, Flower Mound, TX, 75028');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'McDonald''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Method', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Miami Elite', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Microsoft', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Mighty Call X', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Minot AirPort', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Minute Key', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Misc', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'MJ Smokin', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Modernist Pantry', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Moe''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'MoonPay Exodus', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Murphy', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Nature Botanicals', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Natures Flavors', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Natures Table', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Nayax', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'NEPA', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Neptune Beach', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Netflix', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Neustel Law Offices, Ltd', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'New Century Ag', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'New China Town', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Newerac', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'NEXAIR, LLC.', NULL, '(888) 639-2474', 'PO Box 125, Memphis, TN, 38101-0125');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Next Insurance', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Norton', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'O''Reilly Auto Parts', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Office Depot', NULL, NULL, 'Lake City, FL');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'One Stop 6', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'OnNit', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Open AI', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Overlimit Fee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pacdora', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pacific Coast Flower', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'PAI', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pai Iso', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pan''s Food Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Panda Express', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Panera Bread', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Parkmobile', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Paypal', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Paypal Credit', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Payroll Fee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Peacock', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pentagon Federal', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pepe''s Grocery', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'PetSmart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pilot Travel Center', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pizza Hut', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'PlayStation', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Plaza Hotel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Pompano Truck Stop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Popeye''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Potions in Motion', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Priceline', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Prime Video', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Publix', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'PYN', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Qdoba Mexican Grill', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Quality Inn', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Quick Stop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'QuickBooks', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'QuickBooks Payments', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'QuickBooks Payroll', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'QuikStop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'QuikTrip', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'RaceTrac', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Raceway', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Raising Canes', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Razors Edge Barber Cuts', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Rebel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Reef Dispensary', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Regency', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Retellai', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'River City Travel Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'RoadRunner', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Roadway Towing', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Rocket Money', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Rogue Origin', 'support@rogueorigin.com', '(541) 879-0138', '13003 Hwy 62, Eagle Point, OR, 97524');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Roll It Right', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Roots LV', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Runnings', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'S and S', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Saavy Sliders', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sakura Sushi', NULL, NULL, 'Live Oak, FL');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sam''s Club', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sauce, Inc.', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Save-A-Lot', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SavvyNavvy', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SB Cigars', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sea Hag Marina', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Seaglass of Jax Beach', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sean Bruster', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Service Fee', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Shake Shake', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Shakey''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sharkys', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Shell', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sherry Frontenac', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sherry Frontenac Lounge', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'ShipStation', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Shopify', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Simonds International', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sintra', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sleep Inn', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Slim Chickens', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smart Home', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smashburger', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smitty Liquor', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smitty''s Tobacco Outlet LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smoke & Barrel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smokers Outlet', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smokers World', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smokeville  Smoke Shop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Smoothie King', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sonic', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sonny''s BBQ', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Southern Living', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SouthPort Liberty', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Speedway', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Spotify', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Springhills Marriott', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Square Services', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Steak ''n Shake', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Step In Food Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Stub Hub', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sturges Ellie Rays', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Subway', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SunBiz FL', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sunflower Wellness', 'mike@sunflowerwellness.us', '(713) 206-6675', NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sunoco', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SunPass', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sunset Cafe Beach', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Sunshine', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'SunStop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Surcheros Fresh Mex', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Surfer', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Suwannee Paws', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Suwannee Tax', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Swyft Filings, LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Synthesia Limited', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'T-Mobile', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Taco Bell', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Taco Johns', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Taco Taco', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tacology', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Take 5', NULL, NULL, 'Live Oak, FL, 320604');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Talas Online', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tampa Improv', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Teisha', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Temu', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Texaco', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Texas Roadhouse', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The D Long Bar', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The Hose Shop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The Lucky Duck Shop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The Other Store', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The Patent Professor', NULL, NULL, '10394 W Sample Rd
Suite 201');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'The Webstaurant Store', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Thrasker', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'TJC Locksmithing', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'TKO CBD', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tobacco Outlet', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Topp', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Total Petroleum', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tower Suite Cafe', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tractive', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Tractor Supply', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Treasure Island', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Trestle Tap House', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Trilogene Seeds', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Trimble', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'True Accord', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Twilio', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Twin Peaks Cypress', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Uber Eats', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'UI Digital', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Uline Shipiping Supply Specialists', NULL, '(800) 295-5510', 'PO BOX 88741
ATTN: ACCOUNTS RECEIVABLE, CHICAGO, IL, 60680-1741');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'UniNet IColor', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Univar Solutions Inc', 'cashapps@univarsolutions.com', '(800)531-7106 Option 1', '62190 Collections Center Drive, Chicago, IL, 60693-0621');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Uprinting', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'UPS Store', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'US Highway', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'US Patent Office', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'US Plastic Corporation', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vacation Supply', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Valdosta Cinemas', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vanns Carpet', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vape Shop Near Me', NULL, NULL, '146 Palm St. NE, Live Oak, FL, 32064');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vector Shift', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Venmo', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vercel', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vernada Falls, LLC', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Vevor', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'VineVida', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Waffle House', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wal-Mart', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Walgreens', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wawa', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Weber Scientific', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Welcome to the Farm', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wendy''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Westar', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Westside Hemp', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Whistle Express', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wholesale Hemp Farms', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Widget Co', NULL, '(800) 877-9270', '5000 Gulf Freeway
Bldg 6, Houston, TX, 77204-0970');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Windsor', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Windstream', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wing Stop', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Winn-Dixie', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wise', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wix', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'WKU Consulting, LLC.', 'grim@wkuconsultants.com', NULL, '1700 NE Market Drive, Fairview, OR, 97024, USA');

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'WTU Consulting', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Wynwood', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Yoast', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zacadoo Grille', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zach Martin', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zaxby''s', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zelle', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zion Greenfield', NULL, NULL, NULL);

INSERT INTO vendors (company_id, name, email, phone, billing_address) 
VALUES ((SELECT id FROM companies LIMIT 1), 'Zoho Bigin', NULL, NULL, NULL);

