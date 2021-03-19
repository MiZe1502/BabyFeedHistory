import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField
} from "@material-ui/core";
import React from "react";
import {gql, useMutation} from "@apollo/client";


const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export const LoginPage = () => {
    const [auth, data] = useMutation(MUTATION_AUTH);

    const signIn = (login: string, password: string) => {
        auth({ variables: { login: "abs updated login 2", password: "qwerty12" } })
            .then((res) => console.log(res));
    }

    return <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {}} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {}} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    </div>;
}