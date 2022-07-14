CREATE TABLE AndrewNorenaPokemonlist(PokemonId INT PRIMARY KEY, 
	Name VARCHAR(100) NOT NULL, 
	Height INT NOT NULL, 
	Weight INT NOT NULL, 
	UrlImage VARCHAR(255), 
	Locations VARCHAR(MAX), 
	Moves VARCHAR(MAX), 
	Abilities VARCHAR(MAX),
	VideoId VARCHAR(255),
	Popularity INT,
	CreationDate DATETIME DEFAULT GETDATE() NOT NULL,
	ModificationDate DATETIME 
)
