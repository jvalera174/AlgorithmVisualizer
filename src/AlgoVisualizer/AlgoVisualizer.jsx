import React from 'react';
import {getMergeSortAnimations} from './sortingAlgos.jsx';
import './AlgoVisualizer.css';

const ANIMATION_SPEED_MS = 2;
const SIZE_OF_ARRAY = 150;
const INITIAL_COLOR = 'purple';
const HIGHLIGHT_COLOR = 'white';

export default class SortingVisualizer extends React.Component {
   constructor(props) {
      super(props);
      this.state = { array: [],};
   }

   // reset array when app loads
   componentDidMount() {
      this.resetArray();
   }

   // creates array and pushes random values to each element
   resetArray() {
      const array = [];
      for (let i = 0; i < SIZE_OF_ARRAY; i++) {
         array.push(randomIntFromInterval(5, 650));
      }
      this.setState({array});
   }


   mergeSort() {
      const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
         const arrayBars = document.getElementsByClassName('array-bar');
         const isColorChange = i % 3 !== 2;
         if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? HIGHLIGHT_COLOR : INITIAL_COLOR;
            setTimeout(() => {
               barOneStyle.backgroundColor = color;
               barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
         } else {
            setTimeout(() => {
               const [barOneIdx, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
         }
      }
   }

   render() {
      const {array} = this.state;

      return (
         <div className="array-container">
            {array.map((value, idx) => (
            <div
               className="array-bar"
               key={idx}
               style={{
                 backgroundColor: INITIAL_COLOR,
                 height: `${value}px`,}}>
            </div>
            ))}
            <div>
               <button onClick={() => this.resetArray()}>Generate New Array</button>
               <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
         </div>
    );
  }
}

//generate random values for each element in array
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
