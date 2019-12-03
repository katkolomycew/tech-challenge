Minesweeper — November 2019 (_nology_)

DESCRIPTION: Build a program which generates and visualises the minesweeper (uncovered) game field. Input: 3 parameters – number of rows, number of columns, number of mines.

RULES: Each field is either empty, mine or number (1-8). Mine means there is a mine in that field. Number means there is no mine in that field but the number tells you how many mines lay hidden in the eight surrounding squares. Empty means there is no mine and there are no mines in surrounding squares.

REQUIREMENTS: Generate a rectangular field based on input number of rows and columns. Place mines randomly in the field – there can be only one mine in each field. Calculate the number clues and display the field.

OUTPUT: Simple visualisation of uncovered game board, e.g. (15 rows, 15 cols, 30 mines) OR 1X3X1 111, 12X21111 2X2, 1121212X1 3X3, 1X1 1X211 13X2, 111 111 1X21, 122222112221, 1212XX2XX11X11X, X2X222222111111, 1322 111, 1X1 1X211, 1211 1222X1, X1 111 112X1111, 11 2X311X322 11, 2XX1112X112X, 1221 1111X2.

TIP: We care about the generating function (mine generation, clue generation). We do not care much about the input (you can even hardcode the function call but it has to work for ANY positive integer parameters).

TIP: We do not care too much about visualisation either so please just display it somehow. Try to make it fancier ONLY IF you have some time left.

EVALUATION CRITERIA: a) Demonstrate understanding of problem/issue; b) Identify what you need to do to solve problem (thought process); c) Approach and methodology used to solve the problem; d) The result/outcome.
