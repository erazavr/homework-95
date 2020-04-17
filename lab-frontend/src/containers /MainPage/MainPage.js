import React, {Component} from 'react';
import {getCocktails} from "../../store/actions/cocktailsAction";
import {connect} from "react-redux";
import {Card, CardBody, CardDeck, CardImg, CardText, CardTitle, Col} from "reactstrap";

class MainPage extends Component {
    componentDidMount() {
        this.props.getCocktails()
    }

    render() {
        const cocktails = this.props.cocktails;
        console.log(cocktails);
        return (
            <CardDeck>
                {cocktails && cocktails[0] ?
                    <>
                        {cocktails.map(cocktail => (
                            <Col md={6}>
                            <Card key={cocktail.id} className='mb-5'>
                                <CardImg top width="100%" style={{width: '250px'}} src={`http://localhost:8000/uploads/${cocktail.image}`} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle><b>Название коктейля:</b> {cocktail.name}</CardTitle>
                                    <ul>
                                        {cocktail.ingredients.map(ing => (
                                            <li key={ing.name}>{ing.name} - {ing.amount}</li>
                                        ))}
                                    </ul>
                                    <CardText><b>Рецепт:
                                    </b> {cocktail.recipe}</CardText>
                                </CardBody>
                            </Card>
                            </Col>

                        ))}
                    </>: <h1>Нету коктейлей</h1>
                }
            </CardDeck>
        );
    }
}

const mapStateToProps = state => ({
   user: state.users.user,
   cocktails: state.cocktails.cocktails
});

const mapDispatchToProps = dispatch => ({
   getCocktails: () => dispatch(getCocktails())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);