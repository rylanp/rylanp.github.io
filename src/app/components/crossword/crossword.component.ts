import { Component, OnInit, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Cell {
  isLetter: boolean; 
  number?: number; 
  correctLetter: string;
  userInput: string;
  wordIds: { across?: number; down?: number };
  status?: 'correct' | 'incorrect'; 
}

interface Clue {
  id: number;
  number: number;
  text: string;
  answer: string;
  startRow: number;
  startCol: number;
  endRow: number; // Added for easier iteration
  endCol: number; // Added for easier iteration
}
interface Vec2 {
  x: number;
  y: number;
}

@Component({
  selector: 'app-crossword',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crossword.component.html',
  styleUrl: './crossword.component.scss'
})
export class CrosswordComponent implements OnInit {

  // Grid and Clue Data (simplified for example)
  gridSize: Vec2 = {x: 15, y: 15};
  @Input() grid!: Cell[][];
  @Input() clues!: { across: Clue[]; down: Clue[] };
  @ViewChildren('cellInput') cellInputs!: QueryList<ElementRef>;
  activeClue: { id: number; direction: 'across' | 'down' } = { id: 1, direction: 'across' };
  
  ngOnInit() {
    // 1. Set the grid size based on the received input data
    if (this.grid && this.grid.length > 0 && this.grid[0].length > 0) {
      this.gridSize.y = this.grid.length;
      this.gridSize.x = this.grid[0].length;
    } else {
      console.error("CrosswordComponent: Grid data not provided or is empty.");
      return; // Stop initialization if no grid is present
    }

    // 2. Set the initial active clue
    const firstClue = this.clues.across.length > 0 ? this.clues.across[0] : null;
    if (firstClue) {
      this.activeClue = { id: firstClue.id, direction: 'across' };
      // Note: Focus logic should wait until after the view renders if done here.
    }
  }

  // --- UI State Helpers ---
  
  isActiveClue(id: number, direction: 'across' | 'down'): boolean {
    return this.activeClue.id === id && this.activeClue.direction === direction;
  }
  
  // Checks if a cell is part of the currently active word (for highlighting the whole word)
  isCellHighlighted(row: number, col: number): boolean {
    // Safety check in case initialization failed
    if (!this.grid[row] || !this.grid[row][col] || !this.grid[row][col].isLetter) return false;

    const cell = this.grid[row][col];
    return (
      (this.activeClue.direction === 'across' && cell.wordIds.across === this.activeClue.id) ||
      (this.activeClue.direction === 'down' && cell.wordIds.down === this.activeClue.id)
    );
  }

  // Checks if a cell is the one currently selected (for border/focus)
  isCellActive(row: number, col: number): boolean {
    // You may want to add explicit active cell tracking, but highlighting is sufficient for now.
    return this.isCellHighlighted(row, col); 
  }

  // --- Event Handlers ---

  onCellClick(row: number, col: number) {
    const cell = this.grid[row][col];
    if (!cell.isLetter) return;

    // Logic to determine the active word:
    // 1. If the cell is part of the current active word, switch direction (A <-> D).
    // 2. Otherwise, set the active clue to the first available word (e.g., across).
    
    // Example: Toggle direction if the cell belongs to both across and down words
    if (this.isCellHighlighted(row, col)) {
      const newDirection = this.activeClue.direction === 'across' ? 'down' : 'across';
      const newId = newDirection === 'across' ? cell.wordIds.across : cell.wordIds.down;
      if (newId) {
        this.activeClue = { id: newId, direction: newDirection };
      }
    } else if (cell.wordIds.across) {
      this.setActiveClue(cell.wordIds.across, 'across');
    } else if (cell.wordIds.down) {
      this.setActiveClue(cell.wordIds.down, 'down');
    }

    // Set focus programmatically
    this.focusCell(row, col);
  }

  onInput(event: Event, row: number, col: number) {
    const input = event.target as HTMLInputElement;
    const letter = input.value.toUpperCase();
    
    if (letter) {
      // 1. Update the grid state
      this.grid[row][col].userInput = letter;

      // 2. Automatically advance focus to the next cell
      this.advanceFocus(row, col, this.activeClue.direction);
    }
  }
  setActiveClue(id: number, direction: 'across' | 'down') {
    this.activeClue = { id, direction };
    
    // Optional: Programmatically focus on the first cell of the newly active word.
    const clueList = this.clues[direction];
    const clue = clueList.find(c => c.id === id);

    if (clue) {
      // Focus the input element in the starting cell (r: startRow, c: startCol)
      this.focusCell(clue.startRow, clue.startCol);
    }
  }

  /**
   * Helper function to programmatically set focus on a specific grid cell's input.
   * This is necessary because Angular needs to find the correct DOM element.
   * @param row The row index.
   * @param col The column index.
   */
  focusCell(row: number, col: number) {
    // Determine the flat index in the QueryList for the input element.
    // This requires calculating how many *input elements* precede the target cell.
    
    let inputIndex = 0;
    for (let r = 0; r < this.gridSize.y; r++) {
      for (let c = 0; c < this.gridSize.x; c++) {
        const cell = this.grid[r][c];
        
        if (r === row && c === col) {
          // Found the target cell, now focus its input element.
          const inputElement = this.cellInputs.toArray()[inputIndex];
          if (inputElement) {
            (inputElement.nativeElement as HTMLInputElement).focus();
          }
          return;
        }

        // Only count cells that actually have an input element (isLetter = true)
        if (cell.isLetter) {
          inputIndex++;
        }
      }
    }
  }

  advanceFocus(row: number, col: number, direction: 'across' | 'down') {
    let nextRow = row;
    let nextCol = col;
    
    // Find the current active clue to get its bounds
    const clueList = this.clues[direction];
    const activeClueData = clueList.find(c => c.id === this.activeClue.id);

    if (!activeClueData) return;

    // 1. Calculate the coordinates for the potential next cell
    if (direction === 'across') {
      nextCol = col + 1;
    } else { // 'down'
      nextRow = row + 1;
    }

    // 2. Check if the potential next cell is still within the bounds of the active word
    let isWithinBounds = false;
    
    if (direction === 'across' && nextCol <= activeClueData.endCol) {
      isWithinBounds = true;
    } else if (direction === 'down' && nextRow <= activeClueData.endRow) {
      isWithinBounds = true;
    }

    // 3. If it's valid, focus the next cell
    if (isWithinBounds) {
      // Ensure the coordinates are valid for the grid before attempting to focus
      if (nextRow >= 0 && nextRow < this.gridSize.y && 
          nextCol >= 0 && nextCol < this.gridSize.x) {
        
        // Final check to make sure the cell is a letter cell (it should be, based on bounds)
        if (this.grid[nextRow][nextCol].isLetter) {
          this.focusCell(nextRow, nextCol);
        }
      }
    }
    // If we are at the end of the word, we stop advancing focus.
  }

  moveFocus(row: number, col: number, direction: 'up' | 'down' | 'left' | 'right') {
    let nextRow = row;
    let nextCol = col;
    
    // Prevent default browser behavior for arrow keys (scrolling)
    // Note: This needs to be handled in the template event handler (e.g., keydown.arrowup) 
    // by using $event.preventDefault() if not done inside the method itself.

    switch (direction) {
      case 'up':
        nextRow--;
        break;
      case 'down':
        nextRow++;
        break;
      case 'left':
        nextCol--;
        break;
      case 'right':
        nextCol++;
        break;
    }

    // Check bounds and letter status
    if (nextRow >= 0 && nextRow < this.gridSize.y && 
        nextCol >= 0 && nextCol < this.gridSize.x) {
      
      const nextCell = this.grid[nextRow][nextCol];
      
      if (nextCell.isLetter) {
        // Automatically switch the active clue if the movement takes the user
        // into a different word's area (optional, but good UX)
        if (direction === 'left' || direction === 'right') {
          if (nextCell.wordIds.across && this.activeClue.direction !== 'across') {
            this.setActiveClue(nextCell.wordIds.across, 'across');
          }
        } else if (direction === 'up' || direction === 'down') {
          if (nextCell.wordIds.down && this.activeClue.direction !== 'down') {
            this.setActiveClue(nextCell.wordIds.down, 'down');
          }
        }
        
        this.focusCell(nextRow, nextCol);
      }
    }
  }
  onBackspace(row: number, col: number) {
    // 1. Clear the user input for the current cell
    this.grid[row][col].userInput = '';

    // 2. Determine the direction (Across or Down)
    const direction = this.activeClue.direction;

    // 3. Move focus to the previous cell
    let prevRow = row;
    let prevCol = col;

    if (direction === 'across') {
      prevCol = col - 1;
    } else { // 'down'
      prevRow = row - 1;
    }

    // Check if the previous cell is within the grid and is a letter square
    if (prevRow >= 0 && prevRow < this.gridSize.y && 
        prevCol >= 0 && prevCol < this.gridSize.x &&
        this.grid[prevRow][prevCol].isLetter) {
        
      this.focusCell(prevRow, prevCol);
    }
    // Note: If at the start of the word, we just clear the current cell and stop.
  }


  /**
   * Checks the user's input against the correct answers and updates the cell status.
   */
  checkAnswers() {
    let num_wrong = 0;
    for (let i = 0; i < this.gridSize.y; i++) {
      for (let j = 0; j < this.gridSize.x; j++) {
        const cell = this.grid[i][j];
        if (cell.isLetter) {
          if (cell.userInput.toUpperCase() === cell.correctLetter.toUpperCase()) {
            cell.status = 'correct';
            console.log(cell.correctLetter.toUpperCase())
          } else if (cell.userInput.length > 0) {
            cell.status = 'incorrect';
            num_wrong++;
          } else {
            // If empty, reset status or leave it neutral
            cell.status = undefined; 
            num_wrong++;
          }
        }
      }
    }
    if (num_wrong == 0){
      alert("You are so smart! You completed the greatest crossword puzzle ever made!");
    } else {
      alert("So close! It just needs a bit more work. " + num_wrong.toString() + " squares are wrong.");
    }
  }


  /**
   * Clears all user input from the grid.
   */
  resetGrid() {
    for (let i = 0; i < this.gridSize.y; i++) {
      for (let j = 0; j < this.gridSize.x; j++) {
        const cell = this.grid[i][j];
        cell.userInput = '';
        cell.status = undefined; // Clear status highlights
      }
    }
  }

}
