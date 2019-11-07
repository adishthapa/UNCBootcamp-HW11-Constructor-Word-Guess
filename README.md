# Constructor Word Guess

Constructor Word Guess is a simple command line node application that functions as a Movie themed Hangman Game. The purpose of the Game is to figure out all 15 of the Movies in the Game. You have 7 chances per Movie to guess it correctly. If you fail to guess it within 7 tries, you will have the option to restart the game with randomized Movie order.

There are 3 different JS files associated with the Game:
<ol>
  <li><strong>Letter.js:</strong> Contains a constructor for the Letter Object.</li>
  <li><strong>Word.js:</strong> Contains a constructor for the Word Object and it depends on the Letter Object.</li>
  <li><strong>index.js:</strong> Contains all of the functionality for the Hangman Game and depends on the Word Object.</li>
</ol>

<strong>Additionally, the game also requires the inquirer and chalk npm packages to run properly.</strong>

To execute the application, run the following command:
<strong>node index.html</strong>

Here is an example of what the application should look like:
<p align="center">
  <img src="images/example.gif" alt="Constructor Word Guess example.gif">
</p>
