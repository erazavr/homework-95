import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {cocktailPublish, deleteCocktail, getCocktails} from "../../store/actions/cocktailsAction";

class AdminOffice extends Component {
    componentDidMount() {
        this.props.getCocktails();
    }

    render() {
        console.log(this.props.cocktails);
        const initialStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            color: 'white',
            padding: '5px 10px',
            borderTopRightRadius: '2px'
        };
        const publishedTrue = {...initialStyle, background: '#13d613'};
        const publishedFalse = {...initialStyle, background: 'red'};
        const cocktails = this.props.cocktails;
        return (
            <Container>
                <>
                    <Row>
                        {this.props.user && this.props.user.role === 'admin' ? cocktails &&
                            cocktails.map(cocktail => (
                                <Col sm={6}>
                                    <Card className='mb-5'>
                                        <CardImg top width="100%" style={{width: '50%'}}src={`http://localhost:8000/uploads/${cocktail.image}`} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle><b>Название коктейля:</b>{cocktail.name}</CardTitle>
                                            <ul>
                                                {cocktail.ingredients.map(ing => (
                                                    <li key={ing.name}>{ing.name} - {ing.amount}</li>
                                                ))}
                                            </ul>
                                            <CardText><b>Recipe:</b></CardText>
                                            <CardText>{cocktail.recipe}</CardText>
                                            {cocktail.published === false ?
                                                <>
                                                    <Button color='primary' onClick={() => this.props.cocktailPublish(cocktail._id)}>Опубликовать</Button>
                                                    <p style={publishedFalse}>Неопубликовано</p>
                                                </>:
                                                <>
                                                    <Button color='danger' onClick={() => this.props.deleteCocktail(cocktail._id)}>Удалить</Button>
                                                    <p style={publishedTrue}>Опубликовано</p>
                                                </>
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                            )): <h1>Здесь может находиться только админ</h1>
                        }
                        {this.props.user && this.props.user.role === 'admin' && !cocktails[0] && <h1>Нечего опубликовать</h1>}
                    </Row>
                </>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    cocktails: state.cocktails.cocktails
});
const mapDispatchToProps = dispatch => ({
    cocktailPublish: id => dispatch(cocktailPublish(id)),
    getCocktails: () => dispatch(getCocktails()),
    deleteCocktail: id => dispatch(deleteCocktail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOffice);