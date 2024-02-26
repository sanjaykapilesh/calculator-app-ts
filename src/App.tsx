import { FormEvent, useMemo, useState } from "react";
import NumberItem from "./components/NumberItem.tsx";

function App() {
  // State for all the numbers in the list
  const [numbersCollection, setNumbersCollection] = useState<number[]>([]);
  // Input value
  const [numInput, setNumInput] = useState<string>("");

  /**
   * This method is used to update `numbersCollection` and `numInput`
   * This triggers a rerender to update the UI because of the state change
   * @param number
   */
  const handleAddNumber = (number: string): void => {
    setNumbersCollection((prevNumbers) => [
      ...prevNumbers,
      parseInt(number, 10),
    ]);
    setNumInput("");
  };

  /**
   * This method is used to handle the form submission
   * @param event
   */
  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();
    handleAddNumber(numInput);
  };

  /**
   * This method is used to delete a number from the list
   * @param index
   */
  const handleDeleteClick = (index: number): void => {
    const numbersCollectionCopy = [...numbersCollection];
    numbersCollectionCopy.splice(index, 1);
    setNumbersCollection(numbersCollectionCopy);
  };

  // Calculate the sum of all the numbers in the list
  const totalSum = useMemo(() => {
    // Sum all the numbers in the array
    return numbersCollection.reduce((acc, num) => acc + num, 0);
  }, [numbersCollection]);

  // Prevents rendering the list of numbers when the input is changed
  const renderedNumbersCollection = useMemo(
    () =>
      numbersCollection.map((number, index) => (
        // Note: The identical key issue can be fixed by generating uuid when the user adds a number, if needed.
        <NumberItem
          key={number}
          number={number}
          onDeleteClick={() => handleDeleteClick(index)}
        />
      )),
    [numbersCollection],
  );
  return (
    <div className="main-wrapper">
      {/* Input Form */}
      <form onSubmit={(e) => handleFormSubmit(e)} className="app-form">
        <input
          value={numInput}
          onChange={(event) => setNumInput(event.target.value)}
          type="number"
          className="form-input"
          placeholder="Enter a number"
        />
        <button type="submit" className="form-submit-btn">
          ADD
        </button>
      </form>

      {/* Render list of Numbers */}
      {renderedNumbersCollection}

      <div className="box bg-black text-white">
        <p>Sum</p>
        <p>{totalSum}</p>
      </div>
    </div>
  );
}

export default App;
