SET search_path = VetoSansFrontieres;
DROP SCHEMA IF EXISTS VetoSansFrontieres CASCADE;
CREATE SCHEMA VetoSansFrontieres;
 
CREATE TABLE clinique(
        Noclinique VARCHAR(20) NOT NULL,
		nom VARCHAR(20) NOT NULL,
        adresse VARCHAR(50) NOT NULL,
        NumTelephone  VARCHAR(15) NOT NULL,
        NumTelecopie VARCHAR(15),
	 	NoGestionnaire VARCHAR(20), -- Gestionnaire de la clinique
        Primary key (Noclinique)
 );
 
 CREATE TABLE Personnel(
        NoPersonnel VARCHAR(20) NOT NULL,
        Noclinique VARCHAR(20) NOT NULL,
        nom VARCHAR(50) NOT NULL,
        adresse VARCHAR(50),
        NumTelephone VARCHAR(15), 
        DateNaissance DATE, 
        sexe CHAR NOT NULL CHECK (sexe IN ('M', 'F', 'O')),
        NAS INTEGER UNIQUE NOT NULL, 
        salaire INTEGER ,
        fonction VARCHAR(30) NOT NULL CHECK(fonction in ('gestionnaire', 'veterinaire', 'infirmier(e)', 'secretaire', 'personnel entretien')),
    PRIMARY KEY (NoPersonnel),
    FOREIGN KEY (Noclinique) REFERENCES clinique(Noclinique)
 );
 
 CREATE TABLE Proprietaire(
        NoProprietaire VARCHAR(20) NOT NULL,
        Nom VARCHAR(50) NOT NULL,
        adresse VARCHAR(50),
        NumTelephone VARCHAR(50) NOT NULL,
	 	Noclinique VARCHAR(20),
        Primary key (NoProprietaire, Noclinique),
		FOREIGN KEY (Noclinique) REFERENCES clinique(Noclinique)
	 		ON DELETE CASCADE
        	ON UPDATE CASCADE
 );
 
 CREATE TABLE Animal(
        NoAnimal VARCHAR(20)  NOT NULL,
        NoProprietaire VARCHAR(20) NOT NULL,
        Noclinique VARCHAR(20)  NOT NULL, 
        Nom VARCHAR(20) NOT NULL,
        type VARCHAR(20) NOT NULL,
        espece VARCHAR(20) NOT NULL,
        taille INTEGER ,
        poids INTEGER,
        description TEXT,
        DatedeNaissance DATE, 
        DateInscription DATE, 
        etat  VARCHAR(20) NOT NULL,
        PRIMARY KEY (NoAnimal,Noclinique),
        FOREIGN KEY (NoProprietaire,Noclinique) REFERENCES Proprietaire(NoProprietaire,Noclinique)
	        ON DELETE CASCADE
        	ON UPDATE CASCADE, -- Cle primaire de proprietaire
        FOREIGN KEY (Noclinique) REFERENCES clinique(Noclinique)
			ON DELETE CASCADE
        	ON UPDATE CASCADE
 );
 
 CREATE TABLE Examen(
        NoExamen VARCHAR(20) NOT NULL,
        NoPersonnel VARCHAR(20) NOT NULL,
        NoAnimal VARCHAR(20) NOT NULL,
	 	Noclinique VARCHAR(20)  NOT NULL, 
        description TEXT,
        DateExamen DATE,
        Heure TIME ,
        PRIMARY KEY (NoExamen),
        FOREIGN KEY (NoPersonnel) REFERENCES personnel(NoPersonnel)
	        ON DELETE CASCADE
        	ON UPDATE CASCADE,
        FOREIGN KEY (NoAnimal, Noclinique) REFERENCES Animal(NoAnimal, Noclinique) -- Cle primaire de l'animal
	        ON DELETE CASCADE
        	ON UPDATE CASCADE 
 );
  
 CREATE TABLE Traitement(
        NoTraitement VARCHAR(20) NOT NULL,
        Description TEXT,
        cout SMALLINT NOT NULL,
       Primary KEY (NoTraitement)
);
 
 CREATE TABLE Prescription(
        NoTraitement VARCHAR(20)NOT NULL,
	    NoExamen VARCHAR(20) NOT NULL,
        quantiteTraitement SMALLINT NOT NULL,
	 	dateDebut DATE,
	 	DateFin DATE,
 FOREIGN KEY (NoExamen) REFERENCES Examen(NoExamen)
	    	ON DELETE CASCADE
        	ON UPDATE CASCADE,
 FOREIGN KEY (NoTraitement) REFERENCES Traitement(NoTraitement)
	    	ON DELETE CASCADE
        	ON UPDATE CASCADE
 );
 
 -- Contrainte de Foreign KEY CYCLIQUE -- Besoin de postpone le check de la contrainte pour inserer des elements.
ALTER TABLE Clinique ADD CONSTRAINT fk_Gestionnaire
FOREIGN KEY (NoGestionnaire) REFERENCES Personnel (NoPersonnel)
	ON DELETE CASCADE
	ON UPDATE CASCADE
DEFERRABLE INITIALLY DEFERRED;
	-- so this constraint won't be checked immediatly at the beggining.

