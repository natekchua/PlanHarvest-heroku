CREATE TABLE Customer (
CustomerID int,
FirstName varchar(255) NOT NULL,
LastName varchar(255) NOT NULL,
Location varchar(255) NOT NULL,
DateJoined varchar(255) NOT NULL,
PRIMARY KEY (CustomerID)
);

CREATE TABLE Farm (
FarmID int,
OfficeLocation varchar(255) NOT NULL,
DateFounded varchar(255) NOT NULL,
PRIMARY KEY (FarmID)
);

CREATE TABLE Field (
FieldID int,
FarmID int NOT NULL,
Location varchar(255) NOT NULL,
FieldSize real NOT NULL,
IsRentedAway BIT DEFAULT 0,
FOREIGN KEY (FarmID) REFERENCES Farm (FarmID)
PRIMARY KEY (FieldID)
);

CREATE TABLE Rents (
OwnerID int NOT NULL,
RenterID int NOT NULL,
FieldID int NOT NULL,
StartDate varchar(255),
EndDate varchar(255) DEFAULT "",
Cost real DEFAULT 0 NOT NULL,
PRIMARY KEY (StartDate)
FOREIGN KEY (OwnerID) REFERENCES Farm (FarmID),
FOREIGN KEY (RenterID) REFERENCES Farm (FarmID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);

CREATE TABLE Contracts (
ContractID int,
CustomerID int NOT NULL,
FarmID int NOT NULL,
numOfLoads int DEFAULT 0,
StartDate varchar(255) NOT NULL,
DeliverByDate varchar(255) NOT NULL,
Delivered BIT DEFAULT 0,
Rejected BIT DEFAULT 0,
FarmOrCustAct BIT DEFAULT 0,
PRIMARY KEY (ContractID),
FOREIGN KEY (CustomerID) REFERENCES Customer (CustomerID),
FOREIGN KEY (FarmID) REFERENCES Farm (FarmID)
);

CREATE TABLE Product (
ProductID int,
Grade int NOT NULL,
DateStored varchar(255) NOT NULL,
FieldID int NOT NULL,
PRIMARY KEY (ProductID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);

CREATE TABLE For_prod (
ContractID int NOT NULL,
ProductID int NOT NULL,
FOREIGN KEY (ContractID) REFERENCES Contract (ContractID),
FOREIGN KEY (ProductID) REFERENCES Product (ProductID)
);

CREATE TABLE Shed (
ShedID int,
NumRows int DEFAULT 0,
StacksPerRow int DEFAULT 0,
FieldID int NOT NULL,
Location varchar(255) NOT NULL,
PRIMARY KEY (ShedID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);

CREATE TABLE Bin (
BinID int,
volumetricCapacity real DEFAULT 0,
FieldID int NOT NULL,
Location varchar(255) NOT NULL,
PRIMARY KEY (BinID),
FOREIGN KEY (FieldID) REFERENCES Field (FieldID)
);
CREATE TABLE Bale (
ProductID int NOT NULL,
BaleType varchar(255) NOT NULL,
ShedID int NOT NULL,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE,
FOREIGN KEY (ShedID) REFERENCES Shed (ShedID)
);

CREATE TABLE Grain (
ProductID int NOT NULL,
BinID int NOT NULL,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE,
FOREIGN KEY (BinID) REFERENCES Bin (BinID)
);

CREATE TABLE Wheat (
ProductID int NOT NULL,
ProteinPercentage real DEFAULT 0,
hasErgot BIT DEFAULT 0,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);

CREATE TABLE Barley (
ProductID int NOT NULL,
isHulled BIT DEFAULT 0,
hasBlight BIT DEFAULT 0,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);

CREATE TABLE Canola (
ProductID int NOT NULL,
GreensPercentage real DEFAULT 0,
FOREIGN KEY (ProductID) REFERENCES Product (ProductID) ON DELETE CASCADE
);
