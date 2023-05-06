# PokeTrafic

## Introduction

Poketrafic est un prototype de site marchand de vente de cartes Pokemon en ligne.

Le site web est un projet réalisé dans le cadre d'un cours de développement web suivi à EFREI

Les données des cartes sont recupérées à partir de l'[API Pokemon TGC Developers](https://pokemontcg.io/).


## Installation
### Prérequis
- Vue.js
- npm

### Commandes à effectuer
```
npm install

npm run serve

```
## Naviguer sur le site 
### Les Pages

- Accueil
- A propos
- Rechercher les cartes
- Page d'une carte
- Parcourir les collections
- Page d'une collection
- Panier

### Accueil et A propos

Accueil est la page par défaut du site. On y accède en arrivant sur le site ou en appuyant sur le logo.

A propos est une page explicative du site. On y accède par la barre menu du site.

### Recherche et cartes

La recherche des cartes est accessible par la barre du menu. On peut y effectuer une recherche en entrant une partie ou le nom entier de la carte.
> Pour tester : "tor" / "alola" / "drag"

Il y a une liste déroulante pour choisir la rareté de la carte.
> Pour tester : chercher "eon" puis selectionner la rareté "rare rainbow"

Enfin on peut choisir si l'ordre d'affichage se fait selon la date de sortie ou l'ordre alphabétique.
> Pour tester : chercher "charizard" puis trier par date de sortie la plus ancienne.

Les cartes sont affichées avec leurs visuels, leur nom, leur rareté, leur prix ainsi que la possibilité de l'ajouter au panier. Pour afficher les cartes suivantes il suffit d'appuyer sur le bouton numérotant la page situé directement sous la barre des filtres.

En cliquant sur une carte on a accès à sa page dédiée qui contient plus d'informations (type, sous-type, série, date de sortie, extension et logo de l'extension).
A partir de cette page on peut l'ajouter au panier et avoir accès à la page dédiée à son extension en cliquant sur le logo de celle-ci.

### Collections

Les collections sont affichées de la date de sortie la plus ancienne à la plus récente. La navigation se fait avec le bouton identique à celui de la page de recherche.

On accède à la page d'une collection en cliquant sur sa miniature, on a ensuite accès à la totalité des cartes présentent dans cette extension.

### Panier

On accède au panier par la barre menu ou l'icône en haut à droite.

On retrouve sur cette page les cartes du panier avec leur prix et la possibilité d'en acheter plus d'une. On peut aussi procéder à la vente en entrant nos infos ce qui résulterat seulement à un message pop-up nous informant que la commande a bien été enregistrée.

Valider une commande videra le panier (tout comme le bouton "vider le panier")






