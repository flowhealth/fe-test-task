import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import moment from "moment";
import ApiHandler from "../../utils/api/apiHandler";
import { MARK_TYPES } from "../common/constants";
import Mark from "../common/mark/Mark";
import Title, { TITLE_SIZES } from "../common/Title/Title";
import Header from '../header/Header';

class Statistics extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerWinsCount: 0,
      aiWinsCount: 0,
    }
  }

  updateScoreStats() {
    ApiHandler.getScoreStats().then((scoreStats) => {
      this.setState({
        ...scoreStats,
      });
    });
  }

  componentDidMount() {
    this.updateScoreStats();
  }

  render() {
    const { playerWinsCount,
            aiWinsCount,
            crossWinsCount,
            circleWinsCount,
            gameHistory } = this.state;

    return (
      <React.Fragment>
        <Header>
          <Title tag='h1' size={TITLE_SIZES.LG}>Total stats</Title>
          <Link to="/" className="nav-button">
            Back to game
          </Link>
        </Header>

        <section className="section">
          <Row>
            <Col sm={6} xs={12}>
              <Title>Wins by player: </Title>
              <p>You : {playerWinsCount}</p>
              <p>AI : {aiWinsCount}</p>
            </Col>
            <Col sm={6} xs={12}>
              <Title>Wins by mark: </Title>
              <p>
                <Mark className="mark-for-player" type={MARK_TYPES.X} /> : {crossWinsCount}
              </p>
              <p>
                <Mark className="mark-for-player" type={MARK_TYPES.O} /> : {circleWinsCount}
              </p>
            </Col>
          </Row>
        </section>

        {
          (gameHistory && Boolean(gameHistory.length))
          &&
          <section className="section">
            <Title size={TITLE_SIZES.MD}>
              History:
            </Title>
            {
              gameHistory.map((game) => {
                const { winner, winnerMark, ts } = game;
                const date = moment(ts).format('HH:mm DD/MM/YYYY');

                return (
                  <article key={ts}>
                    <Title size={TITLE_SIZES.SM}>
                      {date}
                    </Title>
                    <p>
                    {
                      winner ?
                        <span>
                          Winner : {winner} <Mark className="mark-for-player"
                                                 type={MARK_TYPES[winnerMark]} />
                        </span>
                        :
                        'Draw'
                    }
                    </p>
                  </article>
                )
              })
            }
          </section>
        }
      </React.Fragment>
    )
  }
}

export default Statistics;