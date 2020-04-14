import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormElement from "../Form/FormElement";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {subscribeToUser} from "../../../store/actions/usersActions";
import {fetchPosts} from "../../../store/actions/postsActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    left: '50%',
    top: '40%',
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SubscribeModal = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState(null);

  const subscribe = event => {
    event.preventDefault();

    const data = {displayName: subscription};

    dispatch(subscribeToUser(data));
    dispatch(fetchPosts())
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Subscribe to user</h2>
          <form onSubmit={subscribe}>
            <FormElement
              propertyName="subscription"
              title="Subscription"
              type="text"
              value={subscription}
              onChange={event => setSubscription(event.target.value)}
              placeholder="Enter subscription name"
            />
            <Button type="submit" color="primary">
              Register
            </Button>
          </form>
          {/*<SubscribeModal />*/}
        </div>
      </Modal>
    </div>
  );
};

export default SubscribeModal;