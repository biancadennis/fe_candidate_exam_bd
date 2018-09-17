import React, { Component } from 'react';
import Downshift from 'downshift'
import {FormControl} from 'react-bootstrap'

export default class BreedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBreeds: props.breeds
        };
      }
    render() {
        const inputStyle = {
            height: '25px'
        }
        const breedList = Object.keys(this.state.allBreeds)
        return(
            <Downshift
                onChange={selection => this.props.updateChosenBreed(selection)}
                itemToString={item => (item ? item.value : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                }) => (
                    <div>
                        <FormControl {...getInputProps()}  style={inputStyle} value={this.state.chosenBreed} placeholder={'Enter a Breed to Catch'} />
                        <ul {...getMenuProps()}>
                            {isOpen && inputValue
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