SET search_path = VetoSansFrontieres;

-- CLINIQUES
insert into VetoSansFrontieres.clinique values('C01', 'Clinique MonFamilier' ,'123,  rue Belanger,Montreal, Qc,H1E 2I4','514 455 5120','514 455 5121','G01');
insert into VetoSansFrontieres.clinique values('C02', 'Ami des animaux' ,'477,  Ellington stree,Montreal, QC,M3R 2T9','416 455 5120','416 455 5121','G01');
insert into VetoSansFrontieres.clinique values('C03', 'Clinique animaliere' ,'678,  NewStreet ,Montreal, QC,w3x 1T9','123 443 453','123 443 453','G02');

-- PERSONELS
INSERT INTO VetoSansFrontieres.personnel values('G01','C01','gestionnaire clinique1',' 1566 Hanover Street, New York, NY 10013 ','917 710 2459',DATE'1970-03-05','M',793943622,110000, 'gestionnaire');
INSERT INTO VetoSansFrontieres.personnel values('G02','C02','gestionnaire clinique2',' 855 Main St Bjorkdale, SK S0E 0E0','616 576 6528',DATE'1998-03-05','F',014110076 ,120000, 'gestionnaire');
INSERT INTO VetoSansFrontieres.personnel values('G03','C03','gestionnaire clinique3',' 2710 Oak Ridge Drive, Mexico, MO 65265 ','514 432 5067',DATE'1987-03-05','F',319295846 ,110000, 'gestionnaire');

INSERT INTO VetoSansFrontieres.personnel values('V01','C01','Jean Tremblay','4525 Reserve St Castleton, ON K0K 1M0','469 050 207 ',DATE'1983-06-18','M',522549583,75000, 'veterinaire');
INSERT INTO VetoSansFrontieres.personnel values('I01','C01','infirmiere clinique1','4598 Bayfield St, Qc, H2W 2R1','514 432 5067',DATE'1994-06-13','F',681522306,50000, 'gestionnaire');
INSERT INTO VetoSansFrontieres.personnel values('V02','C02','veterinaire clinique2','2116 Rayborn Crescent, Montreal, Qc, H2W 2R1','519 821 4487',DATE'1962-02-22','M',201862596 ,70000, 'veterinaire');
INSERT INTO VetoSansFrontieres.personnel values('I02','C02','infirmiere clinique2','1156 Rue King Sherbrooke, QC J1H 1R4 ','905 870 5690',DATE'1987-12-30','F',342210671,60000, 'gestionnaire');
INSERT INTO VetoSansFrontieres.personnel values('V03','C03','veterinaire clinique3','2166 Main St,Stoughton, SK S0G 4T0 ','705 718 1044',DATE'1969-03-28','F',322701228 ,100000, 'veterinaire');

-- Proprietaires
INSERT INTO VetoSansFrontieres.Proprietaire values('P001', 'Jean Tremblay', '4175 Halsey Avenue Ottawa, ON K1L 6C7 ', '239 875 107', 'C01');
INSERT INTO VetoSansFrontieres.Proprietaire values('P002', 'Frank Tremblay', '2296 Galts Ave Nipigon, ON P0T 2J0 ', '737 569 533 ', 'C02');
INSERT INTO VetoSansFrontieres.Proprietaire values('P003', 'Robert A.', ' 40 Nelson Street Bearskin Lake, ON P0V 1E0', '514 7379 745', 'C03');

-- Animaux
INSERT INTO VetoSansFrontieres.Animal VALUES('A001', 'P001', 'C01' , 'Zulu' , 'Chien', 'Berger Allemand', 100, 40, 'Dresse', '2019-12-10', '2020-04-16', 'Decede');
INSERT INTO VetoSansFrontieres.Animal VALUES('A002', 'P001','C01' , 'Gatto' , 'Chat', 'Girafe de Kordofan', 700, 250, 'Girafe...', '2007-10-24', '2020-04-16', 'Vivant');
INSERT INTO VetoSansFrontieres.Animal VALUES('A003', 'P002', 'C02','Charlie','Chat', 'Angora', 60, 10, 'Mignon', '1998-12-14', '2020-04-16', 'Vivant');
INSERT INTO VetoSansFrontieres.Animal VALUES('A004', 'P003','C03' , 'Sierra' , 'Serpent', 'Python royal', 300, 15, 'Inoffensif', '2020-04-16', '2005-05-12', 'Vivant');

-- Traitement
INSERT INTO VetoSansFrontieres.Traitement VALUES('T110', 'Traitement à la Pénicilline', 50);
INSERT INTO VetoSansFrontieres.Traitement VALUES('T112', 'Vaccination contre la grippe', 70);
INSERT INTO VetoSansFrontieres.Traitement VALUES('T114', 'Antidepresseur', 30);
INSERT INTO VetoSansFrontieres.Traitement VALUES('T116', 'Massage thérapeutique', 30);

-- Examen
INSERT INTO VetoSansFrontieres.Examen VALUES('EX001', 'V01', 'A002', 'C01' , 'Depressif','2020-04-16','13:00:00');
INSERT INTO VetoSansFrontieres.Examen VALUES('EX002', 'V02', 'A003', 'C02' , 'Grippe','2020-04-16','13:00:00');
INSERT INTO VetoSansFrontieres.Examen VALUES('EX003', 'V02', 'A004', 'C03' , 'Infection','2020-04-16','13:00:00');

-- Prescription
INSERT INTO VetoSansFrontieres.Prescription VALUES('T114', 'EX001', 1, '2020-04-16','2020-05-16');
INSERT INTO VetoSansFrontieres.Prescription VALUES('T112', 'EX001', 1, '2020-04-16','2020-05-16');
INSERT INTO VetoSansFrontieres.Prescription VALUES('T112', 'EX002', 1, '2020-04-16','2020-04-16');
INSERT INTO VetoSansFrontieres.Prescription VALUES('T110', 'EX003', 1, '2020-04-16','2020-05-16');



