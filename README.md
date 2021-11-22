## Avant de lancer le projet
- Assurez-vous que Postgres roule sur vos machines 

- Vérifiez que vous avez NodeJs installé avec `node –v`, si vous ne l'avez pas fait, veuillez suivre les étapes dans les dispos du labo

# Installation de notre application
- Cree une base de donnée sur PGAdmin
- Ouvrir le fichier bdschema.sql ET L'EXECUTER
- Ouvrir le fichier data.sql ET L'EXECUTER
- Dans le dossier client de l'application, executer la commande 'npm install'
- Dans le dossier serveur de l'application,executer la commande 'npm install'

# Attention : 
- Noubliez pas de modifier les proprietes 'user' et 'password' dans le fichier database.service.ts dans le dossier serveur. 
Ils doivent correspondre a ceux de l'utilisateur de PGAdmin.


# Lancer l'application

- Pour lancer l'application, executer d'abord 'npm start' dans le dossier client, ensuite 'npm start' dans le dossier serveur.
