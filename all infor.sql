create database college ;

-- table `admin_a`
use college;
create table admin_a (
IDadmin varchar(5) not null,
Aname varchar(70) not null,
job varchar(120) not null,
Address varchar(90) not null,
Gen char(1) ,
Phone varchar(35) );

-- insert admin

insert into admin_a values
("Am01","Margaret Li","Designer","123 Georgia","F","099-092-6630"),
("Am02","Samantha Lam","Business Analyst","123 Georgia","M","066-595-5655"),
("Am03","Bethany Gelbero","Service Manager","789 LA","F","082-405-7937"),
("Am04"	,"Miller Tremblay","Designer","123 Florida","F","099-780-1198"),
("Am05","Bethany Gelmabero","IT Manager","789 Idaho","M","091-489-5428"),
("Am06","Somsak tangkpng","Administrator","123 Florida","F","091-895-4856"),
("Am07","Jed Jacobs","Administrator","123 Warwick","M","086-156-5982"),
("Am08","Ira Smith","Programmer","546 Hartford","F","098-879-4856"),
("Am09","Amarissa Conroy","Business Analyst","456 Georgia","F","085-134-5685"),
("Am10","Emma Brown","Designer","456 Hartford","M","097-156-5826");

-- table `product`

create table product (
IDP varchar(5) not null,
Proname varchar(40) not null,
Price int not null,
details varchar(1500) not null,
Ptype varchar(30) not null,
dateup date not null ,
IDadmin varchar(5) not null);
-- insert Product


insert into product values
("Pd01","PEACE FOR ALL t-shirt",590,"100% Cotton fabric, fine texture, comfortable to wear","T-shirt","2021-01-02","Am01"),
("Pd02"," The Brands Guitar t-shirt",590,"100% Cotton fabric, fine texture, comfortable to wear","T-shirt","2021-01-05","Am02"),
("Pd03"," Saul Leiter t-shirt",590,"100% Cotton fabric, fine texture, comfortable to wear","T-shirt","2021-01-07","Am02"),
("Pd04","karakai jozo no takagi san valomue 1",65," Manga: Mifumi INABA, Story: Soichiro YAMAMOT","Manga","2021-03-01","Am03"),
("Pd05","karakai jozo no takagi san valomue 3",65," Manga: Mifumi INABA, Story: Soichiro YAMAMOT","Manga","2021-03-08","Am04"),
("Pd06","karakai jozo no takagi san valomue 4",65," Manga: Mifumi INABA, Story: Soichiro YAMAMOT","Manga","2021-03-15","Am05"),
("Pd07","Fender-player-stratblack-mn",23400,"Player Stratocaster MN Body Shape : Stratocaster® Body : Alder Neck : Maple Fingerboard : Maple Nut : Synthetic Bone Frets : 22 Medium Jumbo","Instrument","2021-04-02", "Am06"),
("Pd08","MEDELI DD-630S/ADAP DIGITAL DRUMP",17500,"Kondisi: Baru Berat Satuan: 30 kg Kategori: Alat Musik Etalase: Music","Instrument","2021-04-05", "Am06"),
("Pd09","TAYLOR-414ce-r-v-class-free-case",17500,"ACOUSTIC ELECTRIC Highlights Scale Length 25-1/2 Nut & Saddle Black Graphite, Micarta saddle Bracing V-Class","Instrument","2021-04-07", "Am07"),
("Pd10","Sugus ",15,"chewy candy ","Snack","2021-04-06","Am08"),
("Pd11","Yoyo",299,"Weight	20 G. Taste	Grape","Snack","2021-04-06","Am09"),
("Pd12","Ferrero-Rocher",299,"the finest hazelnuts, dip them in smooth chocolate cream ","Snack","2021-04-06","Am10");

-- table login 
create table login (
email varchar(40) not null,
pw varchar(10) not null,
IDadmin varchar(5) not null,
timelog time);
insert into login values
("Margaret@admin.com","admin123","Am01","19:30:10"),
("Samantha@admin.com","admin123","Am02","18:30:10"),
("Bethany@admin.com","admin123","Am03","12:30:10"),
("Miller@admin.com"  ,"admin123","Am04","14:30:10");

-- Primary And Forgirenkey
ALTER TABLE admin_a
  ADD PRIMARY KEY (IDadmin);
ALTER TABLE product
  ADD PRIMARY KEY (IDP); 
