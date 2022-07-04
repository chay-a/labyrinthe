# Labyrinthe
## Etape 1 Réflexion parcours d'un labyrinthe
### Paragraphe
J'avance de 1, je regarde autour de moi:
- si je peux aller à gauche (Si oui je tourne à gauche);
- si je peux aller à droite (Si oui je tourne à droite);
- Si je ne peux pas aller devant (Si oui je fais demi-tour);

Je fais ça jusqu'à ce que j'arrive sur la case du but.
### Pseudo-code
```
TANT QUE ma position en x n'est pas égale à la position du but en x ET que ma position en y n'est pas égale à la position du but en y, FAIRE
    J'avance de 1
    SI il y a un chemin à gauche, ALORS
        je tourne à gauche
        SINON SI il y a un chemin à droite, ALORS
            je tourne à droite
            SINON SI il n'y a pas de chemin devant, ALORS
                je fais demi-tour
            FINSI
        FINSI
    FINSI
FINTANTQUE
```