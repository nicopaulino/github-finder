import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import './User.css';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function User({ result }) {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [userData, setUserData] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    axios.get(`https://api.github.com/users/${result.login}`, {
          headers: {
            'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
          q: 'q'
          }).then(response => {
            let user = {
              bio: response.data.bio,
              followers: response.data.followers,
              following: response.data.following,
              blog: response.data.blog,
              location: response.data.location,
              email: response.data.email,
              twitter: response.data.twitter_username
            };
            setUserData(user);
          })
  };
    return (
      <Card className="resultsCard" style={{backgroundColor: '#f0ffeb'}}>
    </Card>
    )
}
