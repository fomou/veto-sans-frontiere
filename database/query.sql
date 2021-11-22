SET search_path = VetoSansFrontieres;

-- 1) Lister les  numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le 
--numéro de clinique 
SELECT noclinique, nom, adresse, Nogestionnaire FROM VetoSansFrontieres.clinique ORDER BY noclinique ASC;

--2) Quels sont les noms des employés de plus de 40 ans ordonnés par nom ? 
SELECT nom FROM VetoSansFrontieres.personnel WHERE EXTRACT (YEAR FROM age(CURRENT_DATE, datenaissance)) > 40;
              
--3) Lister les noms des animaux dans toutes les cliniques ainsi que le nombre de fois où ils 
--apparaissent. Par exemple Charlie, 3 
SELECT NOM, COUNT(*) from VetoSansFrontieres.animal GROUP BY nom;  

--4) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs animaux 
--dans une clinique donnée (à vous de la choisir) 
SELECT P.noproprietaire, P.Nom, 
	A.noanimal, A.NOM, A.TYPE, A.ESPECE, A.TAILLE, A.POIDS, A.ETAT, A.DESCRIPTION, A.DATEDENAISSANCE, A.DATEINSCRIPTION 
	FROM VetoSansFrontieres.proprietaire P, VetoSansFrontieres.Animal A WHERE A.noclinique = 'C03' AND P.noproprietaire = A.noproprietaire;  

--5) Lister l’ensemble des examens d’un animal donné en utilisant sa clé primaire 
SELECT * FROM VetoSansFrontieres.Examen WHERE noanimal = 'A002' AND noclinique = 'C01';

--6) Lister le détail des traitements d’un animal suite à un examen donné 
SELECT t.* FROM VetoSansFrontieres.Prescription NATURAL JOIN VetoSansFrontieres.Traitement t WHERE noexamen = 'EX001';

--7) Lister le salaire total des employés par clinique ordonné par numéro de clinique 
SELECT noclinique, SUM(salaire) AS Salaires FROM VetoSansFrontieres.personnel GROUP BY noclinique ORDER BY noclinique;

--8) Lister le nombre total d’animaux par type dans chaque clinique. Par exemple : C1, chat, 40. 
SELECT noclinique, type, COUNT(*) FROM VetoSansFrontieres.Animal GROUP BY type, noclinique ORDER BY noclinique;

--9) Lister le coût minimum, maximum et moyen des traitements 
SELECT MIN(cout) as min, MAX(cout) AS max ,AVG(cout) AS moy FROM VetoSansFrontieres.traitement;  

--10) Quels sont les propriétaires dont le nom contient « blay » ? 
SELECT * FROM VetoSansFrontieres.proprietaire WHERE nom LIKE '%blay%';

--11) Supprimez le vétérinaire « Jean Tremblay » qui travaille dans la clinique dont 
--l’identificateur est C01. 
DELETE from personnel where nom = 'Jean Tremblay' and fonction = 'veterinaire' and noclinique='C01';

--12) Lister les détails des propriétaires qui ont un chat et un chien 
SELECT DISTINCT P.* FROM Proprietaire P, Animal A WHERE P.noproprietaire = A.noproprietaire AND A.type = 'Chien' AND A.noproprietaire IN
	   (SELECT A_.noproprietaire FROM proprietaire P_, animal A_ WHERE P_.noproprietaire = A_.noproprietaire AND A_.type= 'Chat'); 

--13) Lister les détails des propriétaires qui ont un chat ou un chien 
SELECT DISTINCT P.* FROM proprietaire P, animal A 
	WHERE A.noproprietaire = P.noproprietaire and (A.type = 'Chat' or A.type ='Chien');

--14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la grippe 
--(la condition vacciné contre la grippe ne s’applique qu’aux chiens) 
SELECT DISTINCT P.* FROM proprietaire P, animal A WHERE P.noproprietaire = A.noproprietaire AND A.type = 'Chat' except (
	SELECT P_.* FROM proprietaire P_, animal A_ WHERE P_.noproprietaire = A_.noproprietaire AND A_.type = 'Chien' AND A_.noAnimal in (
		SELECT noAnimal FROM Examen Where NoExamen in (
			SELECT noexamen from Prescription Where notraitement = 'T112'
		)
	)
);

--15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le 
--cas contraire, affichez null.
SELECT A.*, T.notraitement, T.description,T.cout, T.quantitetraitement, T.dateDebut, T.dateFin FROM Animal A LEFT OUTER JOIN Examen using(noanimal)  
LEFT OUTER JOIN
	(SELECT T_.*, P.noexamen, P.quantiteTraitement, P.dateDebut, P.dateFin FROM traitement T_, Prescription P WHERE T_.notraitement = P.notraitement) AS T
using (noexamen) WHERE A.noClinique = 'C02';






