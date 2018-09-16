import React, { Component } from 'react';
import Downshift from 'downshift'

export default class BreedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breed: null,
            allBreeds: props.breeds
        };
      }
    render() {
        const breedList = Object.keys(this.state.allBreeds)
        return(
            <Downshift
                onChange={selection => this.props.updateChosenBreed(selection)}
                itemToString
                ={item => (item ? item.value : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => (
                    <div>
                        <input {...getInputProps()} value={this.props.chosenBreed} placeholder={'Enter a Breed to Catch'} />
                        <ul {...getMenuProps()}>
                            {isOpen
                                ? breedList
                                    .filter(breed => !inputValue || breed.includes(inputValue))
                                    .map((item, index) => (
                                        <li
                                            {...getItemProps({
                                                key: item,
                                                index,
                                                item,
                                                style: {
                                                    listStyleType: 'none',
                                                    border: '1px solid gray',
                                                    padding: '2px',
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            {item}
                                        </li>
                                    ))
                                : null
                            }
                        </ul>
                    </div>
                )
            }
            </Downshift>
        )
    }
}