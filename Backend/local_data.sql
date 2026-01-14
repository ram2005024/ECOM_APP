--
-- PostgreSQL database dump
--

\restrict 14INb33fLqykxTxvwZsKa0WciwY2g1uSMLiUEGOCpkKhseFeKLlMHOgV77igWsM

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public."Cart" DISABLE TRIGGER ALL;

INSERT INTO public."Cart" (id, "userId", "createdAt") VALUES (17, 4, '2026-01-11 03:36:31.969');


ALTER TABLE public."Cart" ENABLE TRIGGER ALL;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Category" DISABLE TRIGGER ALL;

INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (13, 'Electronics', '2026-01-01 08:10:34.046', '2026-01-01 08:10:34.046');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (14, 'Grocery', '2026-01-01 08:10:48.987', '2026-01-01 08:10:48.987');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (15, 'Toys', '2026-01-01 08:11:02.101', '2026-01-01 08:11:02.101');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (16, 'Gaming', '2026-01-01 08:11:05.574', '2026-01-01 08:11:05.574');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (17, 'Gadgets', '2026-01-01 08:11:30.214', '2026-01-01 08:11:30.214');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (18, 'Cloths', '2026-01-01 08:11:39.019', '2026-01-01 08:11:39.019');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (19, 'Food', '2026-01-01 08:11:44.847', '2026-01-01 08:11:44.847');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (20, 'Others', '2026-01-01 08:11:56.412', '2026-01-01 08:11:56.412');
INSERT INTO public."Category" (id, name, "createdAt", "updatedAt") VALUES (21, 'Pickles', '2026-01-09 12:14:39.939', '2026-01-09 12:14:39.939');


ALTER TABLE public."Category" ENABLE TRIGGER ALL;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."User" DISABLE TRIGGER ALL;

INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (3, 'Ram Sharma', 'sharmashekhar2005024@gmail.com', '$2b$10$zjv75WiQAmQIvJJZVJxSH..8ZIUBRFDe7sEupPJzsqdwEpoJ0wzIC', '', '2026-01-02 14:47:12.106', '2026-01-02 14:47:12.106', 'seller', true);
INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (1, 'Leon Ryup', 'leonryup@gmail.com', '$2b$10$NIbkA7yQZLbwlk1IP9BndOE5HRTpmm3yhkJHYnxeyCcvqvYgdXJb6', '', '2026-01-02 08:49:38.546', '2026-01-02 08:49:38.546', 'seller', true);
INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (10, 'Radhika Gautam', 'radhikagautam@gorkhais.edu.np', '$2b$10$ugTIO0.Qwx9sLeQE.i396uGOAvSj2hUTRSJU9Ob1Eux5USu/UXwJy', '', '2026-01-11 03:48:40.981', '2026-01-11 03:48:40.981', 'seller', false);
INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (12, 'Ram Sharma', 'sharmashekhar20050@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLuAQinrgW51Hnnk7Vfj5gZhCCjVRigVX9IyG00SW_Mj52Z8zR6=s96-c', '2026-01-12 07:23:46.863', '2026-01-12 07:23:46.863', 'admin', false);
INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (11, 'Teon Ryup', 'teonryup@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocKetCid6uIw5quy7pZzsRH6ar3MyosRy_WZykPz1o-6OC6iIA=s96-c', '2026-01-12 07:10:03.782', '2026-01-12 07:10:03.782', 'customer', false);
INSERT INTO public."User" (id, name, email, password, image, "createdAt", "updatedAt", role, "plusMember") VALUES (13, 'Pratap Ghimire', 'ghimirepratap@gmail.com', '$2b$10$WjErv1zFD206yM6XrU7WPODDCUW1ID2siujP89YE2R/3/btoFySxO', '', '2026-01-13 06:16:08.381', '2026-01-13 06:16:08.381', 'seller', false);


ALTER TABLE public."User" ENABLE TRIGGER ALL;

--
-- Data for Name: Seller; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Seller" DISABLE TRIGGER ALL;

INSERT INTO public."Seller" (id, "userID", description, "isApproved", storename, "reasonForRejection", "approvedAt", "approvedBy", filled, "createdAt", "updatedAt", image, type, "phoneNo", address, income, "isActive") VALUES (33, 3, 'Electro Verse is a modern electronic store built to power up your lifestyle. From everyday essentials to cutting‑edge gadgets, we bring together innovation, quality, and affordability under one roof. Whether you’re searching for sleek home appliances, glowing lamps to brighten your space, or the latest tech accessories, Electro Verse makes shopping simple and inspiring.', 'approved', 'Electro Verse', NULL, '2026-01-13 10:03:41.102', 'Ram Sharma', true, '2026-01-13 09:46:07.401', '2026-01-13 09:46:07.401', 'https://res.cloudinary.com/drouv53hs/image/upload/v1768297567/product_image/product_1768297564486.png', 'Electronics', '9765571937', 'Dhapasi-Mandir,Takache Tol,Dhapasi,Kathmandu-Nepal', NULL, true);
INSERT INTO public."Seller" (id, "userID", description, "isApproved", storename, "reasonForRejection", "approvedAt", "approvedBy", filled, "createdAt", "updatedAt", image, type, "phoneNo", address, income, "isActive") VALUES (34, 10, 'Celebrate heritage and comfort with Mummy Cloths, a collection designed to blend cultural elegance with everyday wear. Crafted from soft, breathable fabrics, these cloths honor timeless traditions while offering modern versatility for your wardrobe', 'approved', 'Mummy cloths', NULL, '2026-01-13 10:24:22.886', 'Ram Sharma', true, '2026-01-13 10:24:02.256', '2026-01-13 10:24:02.256', 'https://res.cloudinary.com/drouv53hs/image/upload/v1768299842/product_image/product_1768299839522.webp', 'Cloths', '9841591035', 'Lamahi-Chaudha,Lamahi-05,Dang-Nepal', NULL, true);
INSERT INTO public."Seller" (id, "userID", description, "isApproved", storename, "reasonForRejection", "approvedAt", "approvedBy", filled, "createdAt", "updatedAt", image, type, "phoneNo", address, income, "isActive") VALUES (35, 13, 'Step into Gaming Verse, your ultimate destination for gaming gear, accessories, and immersive setups. From ergonomic chairs and RGB lighting to high‑performance headsets and streaming essentials, we bring together everything you need to level up your gaming experience.', 'approved', 'Gaming Verse', NULL, '2026-01-13 10:31:41.485', 'Ram Sharma', true, '2026-01-13 10:31:19.48', '2026-01-13 10:31:19.48', 'https://res.cloudinary.com/drouv53hs/image/upload/v1768300279/product_image/product_1768300276604.webp', 'Gaming', '9848962734', 'Lamahi-Galli-06,Lamahi-Dang,NEPAL', NULL, true);


ALTER TABLE public."Seller" ENABLE TRIGGER ALL;

--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Product" DISABLE TRIGGER ALL;

INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (42, 33, 'Glowing Lamp', NULL, 100, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298911/product_image/product_1768298907836.png}', 2, true, 'Bring warmth and elegance into your space with the Glowing Lamp. Designed to cast a soft, ambient glow, it transforms any room into a cozy retreat. Perfect for bedrooms, living areas, or workspaces, this lamp blends modern style with soothing illumination.
', '2026-01-13 10:08:31.73');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (43, 33, 'Speaker', NULL, 199, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299530/product_image/product_1768299526895.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768299532/product_image/product_1768299531399.png}', 2, true, 'Fill your space with powerful, immersive sound using this Speaker Set, designed for music lovers, movie nights, and parties. With crisp highs, deep bass, and a sleek design, it transforms any room into a dynamic audio experience.
', '2026-01-13 10:18:52.288');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (44, 33, 'Headsets', NULL, 100, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299590/product_image/product_1768299587291.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768299591/product_image/product_1768299590981.png}', 0, true, 'Step into immersive audio with these Headsets, built for gamers, professionals, and music lovers. Combining comfort, clarity, and style, they deliver powerful sound while keeping you connected for work or play.
', '2026-01-13 10:19:51.825');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (45, 33, 'CC-Camera', NULL, 450, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299637/product_image/product_1768299633993.png}', 0, true, 'Keep your surroundings secure with this CC Camera, designed for reliable surveillance and peace of mind. Whether for home, office, or commercial spaces, it provides clear visuals and smart monitoring to ensure safety at all times.
', '2026-01-13 10:20:37.359');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (41, 33, '3 Combo Set', NULL, 1000, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298818/product_image/product_1768298814536.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768298821/product_image/product_1768298818647.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768298822/product_image/product_1768298821484.png}', 20, true, 'Elevate your style with this versatile 3 Combo Set of Watches, crafted to suit every occasion. Whether you’re heading to the office, a casual outing, or a special event, this set ensures you always have the perfect timepiece at hand.
', '2026-01-13 10:07:02.282');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (46, 33, 'Airpods', NULL, 30, 13, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299688/product_image/product_1768299684939.png}', 0, true, 'Step into the future of sound with AirPods, engineered for seamless wireless listening and effortless style. Whether you’re enjoying music, taking calls, or powering through workouts, AirPods deliver crystal‑clear audio and unmatched convenience.
', '2026-01-13 10:21:28.597');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (47, 34, 'Wool Overcoat', NULL, 500, 18, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299950/product_image/product_1768299946098.png}', 29, true, 'Classic herringbone coat with notched lapel, flap pockets, and button closure — stylish winter wear.', '2026-01-13 10:25:50.749');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (48, 34, ' Black Formal Suit', NULL, 499, 18, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299999/product_image/product_1768299995250.png}', 0, true, 'Classic textured blazer with burgundy tie and pocket square — sharp, professional style.', '2026-01-13 10:26:40.162');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (49, 34, 'White Polo Shirt', NULL, 236, 18, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300090/product_image/product_1768300063681.png}', 6, true, 'Classic short‑sleeve polo with collar and three‑button placket — clean, versatile style.


', '2026-01-13 10:28:11.092');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (50, 34, 'Green Zip Hoodie', NULL, 700, 18, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300137/product_image/product_1768300134299.png}', 0, true, 'Soft, casual hoodie with zipper, drawstrings, and front pockets — comfy everyday wear.


', '2026-01-13 10:28:57.645');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (51, 35, 'Gaming Chair', NULL, 100, 16, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300389/product_image/product_1768300383902.png}', 0, true, 'Level up your comfort and performance with this Gaming Chair, designed for long sessions of play, work, or streaming. With ergonomic support and sleek style, it keeps you focused while looking sharp.
', '2026-01-13 10:33:10.139');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (52, 35, 'Gaming Setup', NULL, 1200, 16, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300510/product_image/product_1768300505176.png}', 100, true, 'Black‑red gaming chair with desk, dual towers, widescreen monitor, and pro streaming gear.


', '2026-01-13 10:35:10.892');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (53, 35, 'Mouse', NULL, 70, 16, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300926/product_image/product_1768300921144.png}', 0, true, 'Navigate with precision using this Mouse, designed for smooth performance in work, gaming, or everyday use. Its ergonomic shape and responsive controls make it a reliable companion for any setup.
', '2026-01-13 10:42:06.26');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (54, 34, '3 in 1 Shirt', NULL, 200, 18, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768311399/product_image/product_1768311392071.jpg}', 20, true, 'Versatile and stylish, this 3‑in‑1 Shirt is designed to adapt to your lifestyle. Whether you’re dressing for work, casual outings, or layering for cooler weather, it delivers comfort and flexibility in one piece
', '2026-01-13 13:36:39.791');
INSERT INTO public."Product" (id, "sellerId", name, stock, price, "categoryId", image, "offerPrice", show, description, "createdAt") VALUES (55, 35, 'Portable Bluetooth Speaker', NULL, 90, 16, '{https://res.cloudinary.com/drouv53hs/image/upload/v1768331516/product_image/product_1768331508969.png}', 0, true, 'This stylish portable Bluetooth speaker features a sleek design and vibrant lighting. It offers easy connectivity and user-friendly controls, making it perfect for outdoor gatherings or at-home listening.', '2026-01-13 19:11:57.602');


ALTER TABLE public."Product" ENABLE TRIGGER ALL;

--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."CartItem" DISABLE TRIGGER ALL;



ALTER TABLE public."CartItem" ENABLE TRIGGER ALL;

--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Order" DISABLE TRIGGER ALL;

INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (86, 2200, 12, 'cod', 'paid', '{"zip": "64641", "city": "Kathmandu", "phone": "9765571937", "state": "Bagmati", "street": "Devi Temple", "address": "Dhapasi", "country": "Nepal", "userName": "Shekhar Sharma"}', '2026-01-13 18:33:14.029+05:45', '2026-01-13 18:38:28.246+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (82, 1975, 13, 'cod', 'pending', '{"zip": "34534", "city": "Dang", "phone": "9841591035", "state": "Lumbini", "street": "Lamahi Galli", "address": "Lamahi", "country": "Nepal", "userName": "Pratap Ghimire"}', '2026-01-13 18:24:13.7+05:45', '2026-01-13 18:24:13.7+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (85, 294, 1, 'cod', 'pending', '{"zip": "34534", "city": "Dang", "phone": "9841591035", "state": "Lumbini", "street": "Chaudaha", "address": "Lamahi", "country": "Nepal", "userName": "Ram Sharma"}', '2026-01-13 18:31:57.418+05:45', '2026-01-13 18:31:57.418+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (87, 471, 12, 'cod', 'paid', '{"zip": "64641", "city": "Kathmandu", "phone": "9765571937", "state": "Bagmati", "street": "Devi Temple", "address": "Dhapasi", "country": "Nepal", "userName": "Shekhar Sharma"}', '2026-01-13 18:35:01.203+05:45', '2026-01-13 18:38:28.246+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (88, 499, 12, 'cod', 'paid', '{"zip": "64641", "city": "Kathmandu", "phone": "9765571937", "state": "Bagmati", "street": "Devi Temple", "address": "Dhapasi", "country": "Nepal", "userName": "Shekhar Sharma"}', '2026-01-13 18:36:19.186+05:45', '2026-01-13 18:38:28.246+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (89, 30, 10, 'cod', 'pending', '{"zip": "34534", "city": "Mars verse", "phone": "9999999999", "state": "Mars-3", "street": "Red Desert", "address": "Mars red villa", "country": "Nepal", "userName": "Teon"}', '2026-01-13 18:43:02.348+05:45', '2026-01-13 18:43:02.348+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (90, 98, 10, 'cod', 'pending', '{"zip": "34534", "city": "Mars verse", "phone": "9999999999", "state": "Mars-3", "street": "Red Desert", "address": "Mars red villa", "country": "Nepal", "userName": "Teon"}', '2026-01-13 18:43:44.74+05:45', '2026-01-13 18:43:44.74+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (91, 30, 10, 'cod', 'pending', '{"zip": "34534", "city": "Mars verse", "phone": "9999999999", "state": "Mars-3", "street": "Red Desert", "address": "Mars red villa", "country": "Nepal", "userName": "Teon"}', '2026-01-13 18:44:26.452+05:45', '2026-01-13 18:44:26.452+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (83, 5010, 3, 'cod', 'paid', '{"zip": "34534", "city": "Dang", "phone": "9841591035", "state": "Lumbini", "street": "Chaudaha", "address": "Lamahi", "country": "Nepal", "userName": "Ram Sharma"}', '2026-01-13 18:28:07.549+05:45', '2026-01-13 18:38:23.292+05:45', NULL, 0);
INSERT INTO public."Order" (id, "totalAmount", "userId", "paymentMethod", "paymentStatus", address, "createdAt", "updatedAt", "sessionId", "discountAmount") VALUES (84, 5930, 3, 'cod', 'paid', '{"zip": "34534", "city": "Dang", "phone": "9841591035", "state": "Lumbini", "street": "Chaudaha", "address": "Lamahi", "country": "Nepal", "userName": "Ram Sharma"}', '2026-01-13 18:29:40.5+05:45', '2026-01-13 18:38:23.292+05:45', NULL, 0);


ALTER TABLE public."Order" ENABLE TRIGGER ALL;

--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."OrderItem" DISABLE TRIGGER ALL;

INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (169, 82, 42, 'Glowing Lamp', 98, 1, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298911/product_image/product_1768298907836.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (170, 82, 43, 'Speaker', 197, 1, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299530/product_image/product_1768299526895.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768299532/product_image/product_1768299531399.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (171, 82, 44, 'Headsets', 100, 1, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299590/product_image/product_1768299587291.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768299591/product_image/product_1768299590981.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (172, 82, 45, 'CC-Camera', 450, 1, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299637/product_image/product_1768299633993.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (173, 82, 41, '3 Combo Set', 980, 1, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298818/product_image/product_1768298814536.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768298821/product_image/product_1768298818647.png,https://res.cloudinary.com/drouv53hs/image/upload/v1768298822/product_image/product_1768298821484.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (174, 82, 46, 'Airpods', 30, 5, '2026-01-13 12:39:13.7', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299688/product_image/product_1768299684939.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (175, 83, 51, 'Gaming Chair', 100, 4, '2026-01-13 12:43:07.549', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300389/product_image/product_1768300383902.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (176, 83, 52, 'Gaming Setup', 1100, 4, '2026-01-13 12:43:07.549', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300510/product_image/product_1768300505176.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (177, 83, 53, 'Mouse', 70, 3, '2026-01-13 12:43:07.549', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300926/product_image/product_1768300921144.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (182, 85, 42, 'Glowing Lamp', 98, 3, '2026-01-13 12:46:57.418', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298911/product_image/product_1768298907836.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (183, 86, 52, 'Gaming Setup', 1100, 2, '2026-01-13 12:48:14.029', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300510/product_image/product_1768300505176.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (178, 84, 47, 'Wool Overcoat', 471, 3, '2026-01-13 12:44:40.5', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299950/product_image/product_1768299946098.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (179, 84, 48, ' Black Formal Suit', 499, 3, '2026-01-13 12:44:40.5', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299999/product_image/product_1768299995250.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (180, 84, 49, 'White Polo Shirt', 230, 4, '2026-01-13 12:44:40.5', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300090/product_image/product_1768300063681.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (181, 84, 50, 'Green Zip Hoodie', 700, 3, '2026-01-13 12:44:40.5', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768300137/product_image/product_1768300134299.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (184, 87, 47, 'Wool Overcoat', 471, 1, '2026-01-13 12:50:01.203', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299950/product_image/product_1768299946098.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (185, 88, 48, ' Black Formal Suit', 499, 1, '2026-01-13 12:51:19.186', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299999/product_image/product_1768299995250.png}', '', 'DELIVERED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (186, 89, 46, 'Airpods', 30, 1, '2026-01-13 12:58:02.348', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299688/product_image/product_1768299684939.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (187, 90, 42, 'Glowing Lamp', 98, 1, '2026-01-13 12:58:44.74', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768298911/product_image/product_1768298907836.png}', '', 'ORDER_PLACED');
INSERT INTO public."OrderItem" (id, "orderId", "productId", name, price, quantity, "createdAt", image, coupen, "orderStatus") VALUES (188, 91, 46, 'Airpods', 30, 1, '2026-01-13 12:59:26.452', '{https://res.cloudinary.com/drouv53hs/image/upload/v1768299688/product_image/product_1768299684939.png}', '', 'ORDER_PLACED');


ALTER TABLE public."OrderItem" ENABLE TRIGGER ALL;

--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Review" DISABLE TRIGGER ALL;

INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (42, 'Bright and stylish, adds a cozy vibe to my room.”', 4, 42, 13, '2026-01-13 12:40:22.46');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (43, 'Amazing sound quality with deep bass — perfect for parties.”', 4, 43, 13, '2026-01-13 12:40:30.787');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (44, 'Comfortable fit and clear audio, great for gaming sessions.', 4, 44, 13, '2026-01-13 12:40:40.714');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (45, 'Crystal‑clear footage and reliable night vision, feels secure at home.', 5, 45, 13, '2026-01-13 12:40:48.642');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (46, 'Good value for money, all items work well together.”', 3, 41, 13, '2026-01-13 12:40:59.05');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (59, 'Very nice', 4, 42, 10, '2026-01-13 12:59:41.03');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (47, 'Compact and easy to carry, sound is solid for the price.
', 5, 46, 13, '2026-01-13 12:41:09.749');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (60, 'Best sound and affordable price', 5, 46, 10, '2026-01-13 12:59:54.564');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (48, 'Comfortable and stylish, perfect for long gaming sessions. Could use a bit more lumbar support.', 4, 51, 3, '2026-01-13 12:43:52.036');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (49, 'Complete powerhouse — smooth performance, great visuals, and perfect for streaming. Worth every dollar.', 5, 52, 3, '2026-01-13 12:43:59.795');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (50, 'Responsive and precise, great for both gaming and work. Slightly heavy but solid build.', 4, 53, 3, '2026-01-13 12:44:07.507');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (51, 'Warm and stylish, perfect for winter. Slightly heavy but feels premium.”', 4, 47, 3, '2026-01-13 12:45:22.595');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (52, 'Sharp and professional look, fits perfectly for business and events.', 5, 48, 3, '2026-01-13 12:45:31.396');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (53, 'Clean and versatile, great for casual wear. Fabric is smooth and comfy.”', 4, 49, 3, '2026-01-13 12:45:38.477');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (54, 'Soft and cozy, ideal for everyday wear. Price is a bit high but quality shows.', 4, 50, 3, '2026-01-13 12:45:48.388');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (55, 'Best one.Ekdam rmro chaa
', 5, 42, 1, '2026-01-13 12:47:12.908');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (56, 'Best and perfect combination at low price.Thankyou gaming verse.', 5, 52, 12, '2026-01-13 12:49:25.781');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (57, 'This wool overcoat is both warm and stylish, making it a perfect choice for the winter season. The craftsmanship feels premium, with a solid weight that adds to its durability and luxurious appeal. While it is slightly heavy, that extra weight gives a reassuring sense of quality and protection against the cold. The design is timeless, versatile enough to wear for formal occasions or casual outings, and the fabric feels soft yet sturdy. Overall, it’s a coat that combines elegance, comfort, and practicality — a piece that truly elevates your wardrobe.', 5, 47, 12, '2026-01-13 12:50:53.778');
INSERT INTO public."Review" (id, comment, rating, "productId", "userId", "createdAt") VALUES (58, 'The suit looks sharp and professional, but the fit feels a bit off and the fabric is heavier than expected. It works fine for occasional formal events, though it doesn’t deliver the comfort or flexibility I’d hoped for.', 3, 48, 12, '2026-01-13 12:51:49.436');


ALTER TABLE public."Review" ENABLE TRIGGER ALL;

--
-- Data for Name: SubscriptionDetail; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."SubscriptionDetail" DISABLE TRIGGER ALL;

INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (94, 10, 'sub_1SoKvjAjVvX0Obs1kvPZyoku', 'cus_Tlsh2TZRoPcsZa', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 09:27:26', '2026-01-18 09:27:26', 'trialing', 'plusMember');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (95, 10, 'sub_1SoKvjAjVvX0Obs1kvPZyoku', 'cus_Tlsh2TZRoPcsZa', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 09:27:26', '2026-01-18 09:27:26', 'trialing', 'plusMember');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (96, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (97, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (98, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (99, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (100, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (101, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (102, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (103, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (104, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (105, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (106, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (107, 10, 'sub_1SoLmcAjVvX0Obs13Iif1xzQ', 'cus_TltZvaXDO7a8zV', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-11 10:22:05', '2026-01-18 10:22:05', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (108, 13, 'sub_1Sp0ueAjVvX0Obs1GbtYQRSJ', 'cus_Tma48WzFdKuH0m', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-13 06:17:07', '2026-01-20 06:17:07', 'trialing', 'seller');
INSERT INTO public."SubscriptionDetail" (id, "userId", "subscriptionId", "stripeCustomerId", "planId", "trialStart", "trialEnd", status, "subscriptionType") VALUES (109, 13, 'sub_1Sp0ueAjVvX0Obs1GbtYQRSJ', 'cus_Tma48WzFdKuH0m', 'price_1Snx41AjVvX0Obs1OOSqo3Tn', '2026-01-13 06:17:07', '2026-01-20 06:17:07', 'trialing', 'seller');


ALTER TABLE public."SubscriptionDetail" ENABLE TRIGGER ALL;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._prisma_migrations DISABLE TRIGGER ALL;

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('16fc11b3-9257-4df3-bcbf-cb96a92960a4', '0df215f4a1fe040f4e9f57d801eb76cd839c7dc7a15cc863f94613908ddd4164', '2025-12-28 23:55:52.612449+05:45', '20251228181052_init', NULL, NULL, '2025-12-28 23:55:52.604246+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('701cec34-7eef-48be-8390-7ba62e27655e', '01baa06e3440df93a9fafcb9559b20ccf79ab06e978f2d42995d675d927fd895', '2025-12-29 00:19:19.427669+05:45', '20251228183419_unique_email', NULL, NULL, '2025-12-29 00:19:19.421404+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('19c8d043-894a-4fa8-8e31-622a1ec76955', 'b1f6062707c2cab4df56bd520f90404a5bdfaae5c01ac8f61f0548a021c20a87', '2026-01-01 20:41:47.615563+05:45', '20260101145647_init', NULL, NULL, '2026-01-01 20:41:47.609931+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('82ad8981-9757-4623-9fc9-5077c1938c87', '0fd5596dad67c3820bdfb04a8ea0c33213997f68f7cde8862f0652552ae2cfd4', '2025-12-29 00:38:02.79841+05:45', '20251228185302_added_serialon_id', NULL, NULL, '2025-12-29 00:38:02.791695+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2a605e82-fb2c-4790-96af-d181991e3c14', '6d3fa8cd5d3ee27a02f643e4d91f937447339b841da69fe6301501859efe28a5', '2025-12-29 09:54:46.511163+05:45', '20251229040946_init', NULL, NULL, '2025-12-29 09:54:46.50731+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('11a74932-c768-4b82-8679-708fdc2e3a94', 'fe94e1b85f74309760cf27693ba8bee1048b1dcfc3cd02bf13eaae87da7761cf', '2026-01-06 16:21:38.93501+05:45', '20260106103638_init', NULL, NULL, '2026-01-06 16:21:38.920545+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('73bdf4fd-7c02-43fc-a505-ad15a18c4d83', 'bed237d747786588918c5d13e768431d24a0e2f7c610a46a03345e721f12df94', '2025-12-29 12:56:44.027132+05:45', '20251229071144_init', NULL, NULL, '2025-12-29 12:56:44.020899+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a04950b3-ebdf-4501-9487-96245ec92942', '612e7b2c2976af991427ee9765535dc728cb458a04371340af995a22269c4d3f', '2026-01-02 12:49:14.184464+05:45', '20260102070414_init', NULL, NULL, '2026-01-02 12:49:14.179176+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2d38acf5-c0f8-48b9-9178-1bd7f858c8bf', '7abd12acfd0d4dcb476a75ea2dee996d6c4eb0319fd78fd3eb66a90daf9c6561', '2025-12-29 15:12:38.439856+05:45', '20251229092738_init', NULL, NULL, '2025-12-29 15:12:38.421385+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('139915cc-c3f7-42dd-82c5-2e03642177cc', 'c668d2b4484cbd0c766ba70b26844ea91276588323fe8802a7be6b9d2b332a52', '2025-12-29 22:35:41.213037+05:45', '20251229165041_init', NULL, NULL, '2025-12-29 22:35:41.201138+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('eb487760-6304-4c9f-8c6b-7412869325aa', '835c28e05716e591cad1990df7cbc3e148a09e194b17d659bf79915ee19e1f3f', '2025-12-30 00:20:09.2338+05:45', '20251229183509_init', NULL, NULL, '2025-12-30 00:20:09.227722+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('563ac010-d65c-4e16-91a0-61be774b62a7', 'eec9bfbb44fd2f7e1d178e7c8914010193324c5545d432fb4e2aa50ccd45e1c2', '2026-01-02 14:46:42.434382+05:45', '20260102090142_init', NULL, NULL, '2026-01-02 14:46:42.428422+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ea2eb826-f016-4e06-82a1-379284772880', '9d7c5056faa27ad8497ab39e1e063e67e5a614b7ebc387edb5585f2bc24a964a', '2025-12-30 11:53:14.875864+05:45', '20251230060814_init', NULL, NULL, '2025-12-30 11:53:14.870279+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('16989e67-43b7-46ef-8ecb-3e22155306b8', 'b3c58e31454c0cbf3bb9ec574d417af69534dd297bece3bd593b2645581acf20', '2025-12-30 11:56:35.144168+05:45', '20251230061135_init', NULL, NULL, '2025-12-30 11:56:35.136945+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('e0e4cb0f-28b4-4b51-80fa-a801e6730dc4', '6c7fa746fbf7c42f3b9200347796512da393e89f416369fee78fa607e64c3687', '2025-12-30 12:16:44.01392+05:45', '20251230063144_init', NULL, NULL, '2025-12-30 12:16:44.004949+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('53e7f271-0d7c-4206-8437-1f994f89d3b7', '8372cb23b3dc4370ad1991e62f00307ae4078fde3bf5ab35a21792b971700b51', '2026-01-03 14:36:01.867302+05:45', '20260103085101_init', NULL, NULL, '2026-01-03 14:36:01.85373+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('06eb74dc-e888-487a-b519-9c4a7a4cd34e', '93e9ab56c432657f97c12fab3b4b83a41602b7457c35899534c50bfbd8300a08', '2025-12-31 00:26:33.922823+05:45', '20251230184133_init', NULL, NULL, '2025-12-31 00:26:33.919356+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('98ac0328-ad69-4e6e-ac38-d76d6f6af332', 'b1aea447620460ba6d90e0246e0cde7f5182ea5f664d25e63658cc3e46d1f3c4', '2026-01-01 12:50:31.690588+05:45', '20260101070531_init', NULL, NULL, '2026-01-01 12:50:31.683419+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0e865a20-43da-408d-b7a0-1d9de0d0fef1', '3065db52b363b7986f61a0cfcc8bc130ef959ab8757bdc8d8bee66e70cf79b16', '2026-01-06 21:33:29.315487+05:45', '20260106154829_init', NULL, NULL, '2026-01-06 21:33:29.309053+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('3bf6bab6-189e-4922-9bed-c604a6f5afd6', 'eb9d41ffcc51358904cc2d5dd5a27de8f30a09b6c1c0c9cd2fe9a796d0c5ec3d', '2026-01-01 15:13:27.216844+05:45', '20260101092827_init', NULL, NULL, '2026-01-01 15:13:27.212555+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d4e61e97-6b04-41ff-b92c-96adeac549bd', '1ed37b2d9087eb5a42da71d57e7beca57af229a65cec04650df9411d5e513500', '2026-01-03 21:26:13.757736+05:45', '20260103154113_init', NULL, NULL, '2026-01-03 21:26:13.747602+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5c17ef51-b496-4162-ba42-3d35ecb60579', 'd21931a9147a1da683545bc2eee836356327929bb73a6d1c37d463a3843ddb03', '2026-01-03 22:39:41.785021+05:45', '20260103165441_init', NULL, NULL, '2026-01-03 22:39:41.775365+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a890493d-d6db-4fba-ba3d-3b3ce2d81988', '20fe798bc82779b769d0065e301a20b506c40caf60da9118a504fb518036f4d9', '2026-01-07 01:30:32.565609+05:45', '20260106194532_init', NULL, NULL, '2026-01-07 01:30:32.559615+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fc9d149e-fcc3-4c7a-8089-0125962dbb7d', '8525479bffe6c29b5771330a49d0b2584b2b793e026f41a236ab7bf609f5990f', '2026-01-04 15:25:09.174123+05:45', '20260104094009_init', NULL, NULL, '2026-01-04 15:25:09.163437+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6393e00a-a59c-4c27-a98f-4aad1acaf936', '7372e844ab6675bb167c87c8d3b4e7e72c7dc5f9f21bac6d40c5686ef0c6772b', '2026-01-06 21:57:33.133843+05:45', '20260106161233_init', NULL, NULL, '2026-01-06 21:57:33.130034+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0f6dd389-80d6-4e87-b0d5-3167e993d613', 'e78358a9de116da1322a24f92c7e0521dbcefd6fd3d669138c0510d5fbfda3a8', '2026-01-05 12:52:42.204015+05:45', '20260105070742_init', NULL, NULL, '2026-01-05 12:52:42.198298+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cef77f96-a4df-4dfd-a7f8-b543e1c08a55', '73f312313f1cc8dde85506f7dd265ac59a5954248acd78c827250444a58fe17f', '2026-01-05 13:17:57.093745+05:45', '20260105073257_init', NULL, NULL, '2026-01-05 13:17:57.090237+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d0fa1b67-79d4-4397-8be8-fa54c3a74063', 'f988326480a0765f2572282e22d4634ac11b9d369727a9fefcf49dac28363476', '2026-01-06 22:16:08.780027+05:45', '20260106163108_init', NULL, NULL, '2026-01-06 22:16:08.775134+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('712bd23e-d821-491b-a2ee-e58fc0f803fe', '47f436a26960cd445de15bb2bf08c182a3520693266939c8b15e2559ddcf202d', '2026-01-07 15:51:59.933406+05:45', '20260107100659_init', NULL, NULL, '2026-01-07 15:51:59.928117+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7a0a2442-3935-450b-8f29-87bba0241e10', '10a70e353a97eedadc1559141e0a00c019d6ba0fd27de34ea25705bb0b6af209', '2026-01-06 23:54:18.917302+05:45', '20260106180918_init', NULL, NULL, '2026-01-06 23:54:18.911004+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f0e05d8f-65e9-4f56-a1b9-b38a72e00d47', 'b24fadb1d901ef5faa78918198867d0c86ce9c62bc8ed4dd73863043aaca9a2d', '2026-01-07 01:48:17.891748+05:45', '20260106200317_init', NULL, NULL, '2026-01-07 01:48:17.887932+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('532cebc8-363b-4bbd-9f48-df002d319371', '0b109e2c1e45407606b52fbc9c1eb2d52fbbef13e3b5ace63357e2a4dea9fb61', '2026-01-07 00:28:22.214903+05:45', '20260106184322_init', NULL, NULL, '2026-01-07 00:28:22.209303+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b7323ca2-5aeb-4864-9538-bdc125340c67', '9f76a32f4c83783f8af7d06f1674e3535d0f39e2d6f33d25cece01cd3cb4240a', '2026-01-07 13:46:37.851565+05:45', '20260107080137_init', NULL, NULL, '2026-01-07 13:46:37.843319+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5e306382-66ce-4508-ae84-804042f0fa73', '5c982902577e1afdfbca05d4c576e3d8a324da80f60d8a3b000f45b5fa6965c8', '2026-01-07 12:56:50.581974+05:45', '20260107071150_init', NULL, NULL, '2026-01-07 12:56:50.57704+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b1c690d7-45c7-4afc-8585-f17f00fd9f5d', 'cd50448c55845131fe9a9cadfa75afd3764ad4d7d7cfd8f956c87a5597d127ca', '2026-01-07 13:30:26.637074+05:45', '20260107074526_init', NULL, NULL, '2026-01-07 13:30:26.629049+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8477df3f-0733-4439-b283-c4699bdb9768', 'b9e276aee6f2507c2f3dab5cc20c46d0bc63219c3da3725a1cdd2d6bc1c51b6b', '2026-01-07 14:38:12.184084+05:45', '20260107085312_init', NULL, NULL, '2026-01-07 14:38:12.179384+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4c1b09f6-2111-4718-b806-17c80cc913f7', 'b8bfe0bcc3dba2c19db067d0c728880aac55fad9cf3907f859357e41e58fae1a', '2026-01-08 14:05:18.223709+05:45', '20260108082018_init', NULL, NULL, '2026-01-08 14:05:18.218042+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2601b84e-8826-4c16-a6ec-9e996bff49d1', '1a114ed8d00c5b3fa695311d9c9abd6ba7de31af43cb97602a34507497aed922', '2026-01-07 22:57:35.920682+05:45', '20260107171235_init', NULL, NULL, '2026-01-07 22:57:35.913973+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f8db6584-ae68-4c9d-8e59-0781561d5f9b', '0404e839920491b1f8fae83d74f0d9e5ea8a3beeb1cee421106c6a698e8c6372', '2026-01-09 00:54:20.071734+05:45', '20260108190920_init', NULL, NULL, '2026-01-09 00:54:20.050644+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0a3e4076-c7c3-4aa6-8d17-63c238f9cb1d', '6167afdb3e0582c04576a3791837a813f55813e63ad22d4be7b37ffc41f61507', '2026-01-09 14:19:32.225579+05:45', '20260109083432_init', NULL, NULL, '2026-01-09 14:19:32.218844+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('98c00fd8-ed04-41ea-9d8d-3d85128bb31d', '11b53e22534dfc67894d7113e49c0ef832bad899ffbf2378cc74a7f9fd4d7de3', '2026-01-10 14:25:10.771141+05:45', '20260110084010_init', NULL, NULL, '2026-01-10 14:25:10.750343+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('83d095c4-3416-4981-93ff-a53915f86087', '50bab1181a35220c70aa659dd586698b63ab5ebc0468da2b2fa48f61501faaf4', '2026-01-10 20:33:43.2684+05:45', '20260110144843_init', NULL, NULL, '2026-01-10 20:33:43.263939+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('71f9e2af-d8cb-4d97-ac0d-1a62c63be27c', 'cc08663de3c38fd9c2f090b9a59cb283de09cc9bdd37edbfe971d04bab91cba3', '2026-01-11 11:56:30.348704+05:45', '20260111061130_init', NULL, NULL, '2026-01-11 11:56:30.345192+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b2071738-fb1b-447f-8cd2-6820949585d5', '9ab167b44e2cadc0aa0759e2a74cea033af62c14a0625035751d5d292e09a9c1', '2026-01-11 21:48:18.463596+05:45', '20260111160318_init', NULL, NULL, '2026-01-11 21:48:18.4562+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('01e20345-97b5-4fc6-8b94-6050fa2cb64e', 'a03818abcc14bc3750cc432359e3a1ca700ee138dfc5116bd99a7b9d336a28a8', '2026-01-11 22:41:29.544168+05:45', '20260111165629_init', NULL, NULL, '2026-01-11 22:41:29.53758+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ebbfb98b-18c4-4e7f-ad1f-8b45dd1617e9', '66a580c94abb7e3ba6e454c04389ea711faf75dd6f91c9c600600cd24a3f39cb', '2026-01-11 22:43:45.181725+05:45', '20260111165845_init', NULL, NULL, '2026-01-11 22:43:45.178957+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('69e9cd35-103c-42d5-8ba1-c3b6b194958c', 'bd0a4f3abc16fb9030289c205af66abdd2b1d7f912bb03849aa75f3cde55c1ab', '2026-01-12 13:35:54.787013+05:45', '20260112075054_init', NULL, NULL, '2026-01-12 13:35:54.78142+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('170785d7-cc7d-4b28-93f5-7c780fc86c9d', '71636cf43264d829a16da042e096c6b5994d497fe33256af32100d55943ed681', '2026-01-13 13:54:02.13227+05:45', '20260113080902_init', NULL, NULL, '2026-01-13 13:54:02.12574+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6044ee91-b465-447f-a0a7-c25d23cc83e1', 'bfa7fa26f5a12a1a25da4db405c88da1fd48b6b8cb16d3154bee10143cdd1b5c', '2026-01-13 13:54:40.42257+05:45', '20260113080940_init', NULL, NULL, '2026-01-13 13:54:40.418129+05:45', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f9f22453-da1d-41f4-896d-70dc00915682', 'd2e37fd23ad01735119f27fd259c0eeae5ce42b3727f8630b77d799e5c41f0c7', '2026-01-13 13:55:29.076541+05:45', '20260113081029_init', NULL, NULL, '2026-01-13 13:55:29.072667+05:45', 1);


ALTER TABLE public._prisma_migrations ENABLE TRIGGER ALL;

--
-- Data for Name: coupens; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.coupens DISABLE TRIGGER ALL;

INSERT INTO public.coupens (id, code, "maxCartValue", "discountType", "discountValue", "expiresAt", "forPlus", "maxDiscount", "isActive", "forNewUser", description) VALUES (8, 'PLUS20', 10, 'percentage', 5, '2026-01-14 00:00:00', true, 999, true, false, 'Discount for member');
INSERT INTO public.coupens (id, code, "maxCartValue", "discountType", "discountValue", "expiresAt", "forPlus", "maxDiscount", "isActive", "forNewUser", description) VALUES (7, 'PLUS10', 10, 'percentage', 10, '2026-01-27 00:00:00', false, 1000, true, true, 'DISCOUNT FOR NEW USER');


ALTER TABLE public.coupens ENABLE TRIGGER ALL;

--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 135, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 43, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Category_id_seq"', 21, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 188, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Order_id_seq"', 91, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Product_id_seq"', 55, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Review_id_seq"', 60, true);


--
-- Name: Seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Seller_id_seq"', 35, true);


--
-- Name: SubscriptionDetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SubscriptionDetail_id_seq"', 109, true);


--
-- Name: coupens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coupens_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 13, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 14INb33fLqykxTxvwZsKa0WciwY2g1uSMLiUEGOCpkKhseFeKLlMHOgV77igWsM

