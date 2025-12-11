// Define the data structures (Interfaces) used by the component.
// These should match the definitions in your crossword.component.ts.

export interface Cell {
  isLetter: boolean;
  number?: number;
  correctLetter: string;
  userInput: string;
  wordIds: { across?: number; down?: number };
  status?: 'correct' | 'incorrect';
}

export interface Clue {
  id: number;
  number: number;
  text: string;
  answer: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface ParsedPuzzle {
    grid: Cell[][];
    clues: { across: Clue[]; down: Clue[] };
}

/**
 * Parses the raw text string into a structured crossword puzzle object.
 * Implements standard sequential numbering (L-to-R, T-to-B) only for starting cells.
 * @param rawText The multi-line string containing the grid and clue data.
 * @returns A ParsedPuzzle object.
 */
export function parseCrosswordData(rawText: string): ParsedPuzzle {
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let gridLines: string[] = [];
    let acrossClueStrings: string[] = [];
    let downClueStrings: string[] = [];
    
    let section = 'grid'; 

    // --- Phase 1: Separate Grid and Clue Sections ---
    for (const line of lines) {
        if (line.startsWith('Across Words:')) {
            section = 'across';
            continue;
        }
        if (line.startsWith('Down Words:')) {
            section = 'down';
            continue;
        }
        
        if (section === 'grid' && !line.includes('(')) {
            gridLines.push(line);
        } else if (section === 'across') {
            acrossClueStrings.push(line);
        } else if (section === 'down') {
            downClueStrings.push(line);
        }
    }

    // Determine grid size
    const numRows = gridLines.length;
    
    let clueIdCounter = 1; // Unique internal ID for each word
    
    // Helper to parse a single clue line
    const parseClueLine = (line: string, direction: 'across' | 'down'): Clue | null => {
        // Regex to capture coordinates, answer, and clue text: ( R, C) ANSWER CLUE TEXT
        const match = line.match(/^\(\s*(\d+),\s*(\d+)\)\s*(\S+)\s*(.*)/);
        if (match) {
            const [_, rowStr, colStr, answer, text] = match;
            const row = parseInt(rowStr, 10);
            const col = parseInt(colStr, 10);
            
            return {
                id: clueIdCounter++,
                number: 0, // Placeholder
                text: text.trim(),
                answer: answer.toUpperCase(),
                startRow: row,
                startCol: col,
                endRow: row + (direction === 'down' ? answer.length - 1 : 0),
                endCol: col + (direction === 'across' ? answer.length - 1 : 0),
            };
        }
        return null;
    };

    const acrossClues = acrossClueStrings.map(line => parseClueLine(line, 'across')).filter((c): c is Clue => c !== null);
    const downClues = downClueStrings.map(line => parseClueLine(line, 'down')).filter((c): c is Clue => c !== null);

    // --- Phase 2: Populate Grid and Assign Sequential Clue Numbers/IDs ---
    
    // Initialize empty grid based on size
    const grid: Cell[][] = Array.from({ length: numRows }, (_, r) => 
        Array.from({ length: gridLines[r].length }, () => ({ isLetter: false, correctLetter: '', userInput: '', wordIds: {} }))
    );

    // Create Maps for quick lookup of word starts
    const acrossClueMap = new Map<string, Clue>(acrossClues.map(c => [`${c.startRow},${c.startCol}`, c]));
    const downClueMap = new Map<string, Clue>(downClues.map(c => [`${c.startRow},${c.startCol}`, c]));

    let clueNumberCounter = 1; // Tracks the visual number (1, 2, 3...)
    
    for (let r = 0; r < numRows; r++) {
        const rowData = gridLines[r];
        for (let c = 0; c < rowData.length; c++) {
            const cell = grid[r][c];
            const char = rowData[c];
            const key = `${r},${c}`;

            // 2a. Populate correct letters and black squares
            if (char === '#') {
                cell.isLetter = false;
                continue;
            }
            
            cell.isLetter = true;
            cell.correctLetter = char.toUpperCase();

            // 2b. Assign Sequential Clue Numbers and Map Word IDs to Cells
            
            const startsAcross = acrossClueMap.has(key);
            const startsDown = downClueMap.has(key);

            // Does this cell start an Across OR a Down word?
            if (startsAcross || startsDown) {
                
                // Assign the next sequential number to the cell
                cell.number = clueNumberCounter;
                
                // Link the clues to this sequential number and map word IDs
                if (startsAcross) {
                    const clue = acrossClueMap.get(key)!;
                    clue.number = clueNumberCounter; // Update the Clue object
                    
                    // Map the clue's ID to every cell it covers
                    for (let i = 0; i < clue.answer.length; i++) {
                        // Safety check: ensure we don't write to black squares/out of bounds
                        if (c + i < grid[r].length && grid[r][c + i].isLetter) {
                             grid[r][c + i].wordIds.across = clue.id;
                        }
                    }
                }

                if (startsDown) {
                    const clue = downClueMap.get(key)!;
                    clue.number = clueNumberCounter; // Update the Clue object
                    
                    // Map the clue's ID to every cell it covers
                    for (let i = 0; i < clue.answer.length; i++) {
                        // Safety check: ensure we don't write to black squares/out of bounds
                        if (r + i < numRows && grid[r + i][c].isLetter) {
                            grid[r + i][c].wordIds.down = clue.id;
                        }
                    }
                }
                
                // Increment the counter only after assigning it to the starting cell(s)
                clueNumberCounter++;
            }
        }
    }

    // Final result should only contain clues that were assigned a sequential number
    const finalAcross = acrossClues.filter(c => c.number > 0);
    const finalDown = downClues.filter(c => c.number > 0);

    return { grid, clues: { across: finalAcross, down: finalDown } };
}