# Odysseus' Map

This is a tool created to draw islands depending on one another on a map. It is made to make it easier to follow odysseus path along islands when given simple directions like "He traveled from island A 3 days to the east and got to island B. From there on, he traveled to island C in 8 days to the south". Many more islands depending on previous ones could be given further in the text.

Knowing roughly how the islands are placed now, they might be drawn on paper. The problem is that if the distance or direction from island A to island B needs to be changed to better match a description from another source or to try to fit the drawn island group onto a real island group on a map, all islands following island B need to be redrawn too since they depend on island B in one way or another.

This tool does the redrawing of islands further down the dependency-chain for you.

## Features

The UI consinsts of a map on the left hand side and controls section on the right hand side. The map shows the islands which depend on each other in the correct positions.

### The map

The map shows the islands. You can select an island by clicking on the island or the name of the island. This opens the island editing UI in the controls section. The selected island and its name are shown in red. Islands which are currently not selected together with their names are shown in black. 

### Navigate on the map

The controls on the very top of the controls section allow to navigate the map. For this purpose six buttons are placed:

* A magnifying glass with a + symbol inside: Used to zoom in on the map (click on the button or press `+` on the keyboard)
* A magnifying glass with a - symbol inside: Used to zoom out off the map (click on the button or by press `-` on the keyboard)
* A chevron pointing to the left: Used to move the map to the left (click on the button or press the left arrow key on the keyboard)
* A chevron pointing to the right: Used to move the map to the right (click on the button or press the right arrow key on the keyboard)
* A chevron pointing up: Used to move the map up (click on the button or press the up arrow key on the keyboard)
* A chevron pointing down: Used to move the map down (click on the button or press the down arrow key on the keyboard)

In case you are lost you can press the `reset` button. This resets the zoom and position on the map to the default.

The controls to navigate on the map are always shown.

### Default UI

The default UI is shown when no island is selected. From here you can do the following:

* Add a new  island that does not depend on any other island position by pressing the "Neue unabhängige Insel" button. This adds a new independent island and selects it instantly.
* Save the current state of the map by pressing the `Speichern` button. This opens the save dialog which is explained in more detail in a separate section.
* Load a previous state of the map by pressing the `Laden` button. This opens the load dialog which is explained in more detail in a separate section.

### Selected island UI

THe selected island UI is shown when an island is selected. Here you can see the following:

* The name of the island.
* The `x` button to get back to the default UI.
* The trashcan button to delete the currently selected island. Clicking it shows the `Ja, löschen!` button right beside the trashcan button. Only when clicking this confirmation button, the island is deleted. This cannot be undone.
* The x position on the map.
* The y position on the map.
* The `Neue abhängige Insel` button to add a new island of which the position should depend on the position of the currently selected island. The dependency is shown by an arrow going from the "parent" (the one selected) to the "child" (the new island) island. When clicking the button, the new island is also automatically selected.

Depending on if position of the currently selected island depends on the position of another island, or if it is an independent island instead, different controlls are shown.

#### Controls for independent islands

If the position of the currently selected island does not depend on the position of another island the following controlls are shown:

* A sentence informing you that this island does not depend on any other island.
* An input `Name` to change the name of the island.
* An input `Notiz` to change or add a note regarding the island.
* An input to change the x position the island has on the map.
* An input to change the y position the island has on the map.
* The `Speichern` button to save the values currently in the inputs and re-render the map.

#### Controls for depending islands

If the position of the currently selected island does depend on the position of another island the following controlls are shown:

* A sentence informing you which island the position of the currently selected one is depending on (called "parent island" for convenience). 
* An input `Name` to change the name of the island.
* An input `Notiz` to change or add a note regarding the island.
* An input `Speed [ktn]` to change the speed (in knots) at which Odysseus would have traveled when starting his journey from the parent island.
* An input `Dauer [Stunden]` to change the time (in hours) which Odysseus would have spent travelling on his journey starting from the parent island.
* An input `Richtung [Grad]` to change the direction (in degrees) which Odysseus would gone in on his journey starting from the parent island (0 is north).
* An info text `Resultierende Distanz:` to inform you about the distance of the journey depending on the current settings (in nautical miles);
* The `Speichern` button to save the values currently in the inputs and re-render the map.

### Saving

To save the current state of the map, press the `Speichern` button in the default UI. This brings up the save dialog. Copy the generated code and save it on your local machine, for example in a text file. 

Clicking the `x` button on the top right of the save dialog or the `Schließen` button closes the dialog.

### Loading

To load a state again, press the `Laden` button in the default UI. This brings up the load dialog. Paste a generated code which you saved on your local machine and paste it into the input. Clicking the `Laden` button loads the state from the code and closes the dialog. Notice that this overwrites the current state. This cannot be undone.

Clicking the `x` button on the top right of the save dialog or the `Schließen` button closes the dialog.

## Limitations

One big limitation is that the position of one island can only depend on the position of at most one other island. There is currently no way to make the position of one island depend on multiple other islands. The reason for this is that it is much more complicated to implement.

## For Devs

### Important commands:

* `npm run watch` - watch for changes
* `npm run dev` - start dev server
* `npm run build` - build
* `npm run production` - build for production
