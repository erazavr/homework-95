import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import FormElement from "../../components/FormElement/FormElement";
import {connect} from "react-redux";
import {postCocktail} from "../../store/actions/cocktailsAction";
import {Redirect} from "react-router-dom";

class CocktailBuilder extends Component {
    state = {
        name: '',
        recipe: '',
        ingredients: [],
        image: '',
    };

    submitFormHandler = async event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (key === 'ingredients') {
                const arr = JSON.stringify(this.state[key]);
                return formData.append(key, arr);
            }
            formData.append(key, this.state[key]);
        });

        this.props.postCocktail(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    addIngredient = () => {
      this.setState({ingredients: [...this.state.ingredients, {name: '', amount: ''}]})
    };

    changeIngredient = (i, key, e) => {
        const ingCopy = {...this.state.ingredients[i]};
        ingCopy[key] = e.target.value;

        const ingsCopy = [...this.state.ingredients];
        ingsCopy[i] = ingCopy;

        this.setState({ingredients: ingsCopy})
    };

    removeIngredient = i => {
        const ingredients = this.state.ingredients;

        ingredients.splice(i,1);
        this.setState({ingredients})
    };
    render() {
        return (
            <>
                {this.props.user ?
                    <>
                        <h1>Добавить коктейль</h1>
                        <Form onSubmit={this.submitFormHandler}>
                            <FormElement
                                propertyName='name'
                                title='Название коктейля'
                                value={this.state.name}
                                onChange={this.inputChangeHandler}
                                type='text'
                            />
                            <FormGroup row>
                                <Col sm={{offset: 2, size: 10}}>
                                    <Button color='primary' onClick={this.addIngredient}>Добавить ингредиент</Button>
                                </Col>
                            </FormGroup>
                            <Label>Ингредиенты</Label>
                            {this.state.ingredients.map((ing, i) => (
                                <Row key={i}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Input onChange={e => this.changeIngredient(i, 'name', e)} placeholder='Название'/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Input onChange={e => this.changeIngredient(i, 'amount', e)} placeholder='Количество'/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <Button color='danger' onClick={() => this.removeIngredient(i)}>Remove</Button>
                                    </Col>
                                </Row>
                            ))}
                            <FormElement
                                propertyName='recipe'
                                title='Рецепт'
                                value={this.state.recipe}
                                onChange={this.inputChangeHandler}
                                type='textarea'
                            />
                            <FormElement
                                propertyName='image'
                                title='Image'
                                onChange={this.fileChangeHandler}
                                type='file'
                            />
                            <FormGroup row>
                                <Col sm={{offset: 2, size: 10}}>
                                    <Button color='primary' type='submit'>Создать коктейль</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </>: <Redirect from='/cocktailBuilder' to='/login'/>
                }

            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
   postCocktail: cocktailData => dispatch(postCocktail(cocktailData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailBuilder);