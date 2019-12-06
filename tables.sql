CREATE TABLE For_prod (
ContractID int NOT NULL,
ProductID int NOT NULL,
FOREIGN KEY (ContractID) REFERENCES Contract (ContractID),
FOREIGN KEY (ProductID) REFERENCES Product (ProductID)
);

CREATE TABLE Customer (
CustomerID SERIAL,
FirstName varchar(255) NOT NULL,
LastName varchar(255) NOT NULL,
DateJoined DATE DEFAULT CURRENT_DATE,
PRIMARY KEY (CustomerID)
);

CREATE TABLE AuthFarmer (
ID int NOT NULL,
Password varchar(20) NOT NULL,
FOREIGN KEY (ID) REFERENCES Farm (FarmID)
);

CREATE TABLE AuthCustomer(
ID int NOT NULL,
Password varchar(20) NOT NULL,
FOREIGN KEY (ID) REFERENCES Customer (CustomerID)
);

CREATE TABLE Farm (
FarmID SERIAL,
OfficeLocation varchar(255) NOT NULL,
DateFounded DATE DEFAULT CURRENT_DATE,
PRIMARY KEY (FarmID)
);

CREATE TABLE Field (
FieldID SERIAL,
FarmID int NOT NULL,
Location varchar(255) NOT NULL,
FieldSize real DEFAULT 20,
IsRentedAway boolean DEFAULT false,
PRIMARY KEY (FieldID),
FOREIGN KEY (FarmID) REFERENCES Farm (FarmID) ON DELETE CASCADE
);

CREATE TABLE Contract (
ContractID SERIAL,
CustomerID int NOT NULL,
FarmID int NOT NULL,
numOfLoads int DEFAULT 1,
productType varchar(12),
productGrade int,
StartDate  DATE DEFAULT CURRENT_DATE,
DeliverByDate DATE,
Delivered boolean DEFAULT false,
Rejected BIT DEFAULT '0'::"bit",
PRIMARY KEY (ContractID),
FOREIGN KEY (CustomerID) REFERENCES Customer (CustomerID) ON DELETE CASCADE,
FOREIGN KEY (FarmID) REFERENCES Farm (FarmID) ON DELETE CASCADE
);

CREATE TABLE Product (
ProductID SERIAL,
Grade int NOT NULL,
DateStored DATE DEFAULT CURRENT_DATE,
FieldID int,
PRIMARY KEY (ProductID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID) ON DELETE CASCADE
);

CREATE TABLE Shed (
ShedID SERIAL,
NumRows int DEFAULT 2,
StacksPerRow int DEFAULT 10,
FieldID int NOT NULL,
Location varchar(255),
PRIMARY KEY (ShedID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);

CREATE TABLE Bin (
BinID SERIAL,
VolumetricCapacity real DEFAULT 10, 
VolumeFilled real DEFAULT 0,
FieldID int NOT NULL,
Location varchar(255),
ProductType varchar(255) DEFAULT NULL,
PRIMARY KEY (BinID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);

CREATE TABLE Bale (
ProductID SERIAL,
BaleType varchar(255) NOT NULL,
ShedID int NOT NULL,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE,
FOREIGN KEY (ShedID) REFERENCES Shed (ShedID)
);

CREATE TABLE Grain (
ProductID int NOT NULL,
BinID int NOT NULL,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE,
FOREIGN KEY (BinID) REFERENCES Bin (BinID) ON DELETE CASCADE
);

CREATE TABLE Wheat (
ProductID int NOT NULL,
ProteinPercentage real DEFAULT 0,
hasErgot BOOLEAN DEFAULT false,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);

CREATE TABLE Barley (
ProductID int NOT NULL,
isHulled BOOLEAN DEFAULT false,
hasBlight BOOLEAN DEFAULT false,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);

CREATE TABLE Canola (
ProductID int NOT NULL,
GreensPercentage real DEFAULT 0,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);
