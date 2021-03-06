import * as React from "react";
import * as classNames from "classnames";
import { IAccount } from "types";
import { Box, Flex } from "reflexbox";
import { Button } from "components";
import * as style from "styles/primary/components/DevToolbar.scss";
import { addProduct } from "actions/product";
import { login } from "actions/account";

interface IDevToolbarProps {
    dispatch: Function;
    account: IAccount;
}

export default class DevToolbar extends React.Component<IDevToolbarProps, {}> {
    addRandomProduct() {
        let codes = [
            "7310500088853",
            "7340083438684",
            "7611612221351",
            "7310500114934",
            "7310070765840",
            "7315360010754",
            "7622300342753"
        ];
        let randomIndex = Math.floor(Math.random() * codes.length);
        this.props.dispatch(addProduct(codes[randomIndex]));
    }

    qrcode() {
        if (this.props.account && this.props.account.token) {
            var url = process.env.API.host + "/profile/" + this.props.account.token;
            return (
                <Button icon="qrcode" onClick={() => window.open(url)}/>
            );
        }
    }

    render() {
        var dispatch = this.props.dispatch;
        var classList = classNames({
            [style.devbar]: true,
            [style.fixedWidth]: process.env.SCREEN === 'primary'
        });
        return (
            <Flex pl={2} align="center" className={classList}>
                <Box auto>{process.env.API.host}</Box>
                {this.qrcode()}
                <Button icon="credit-card" onClick={() => dispatch(login('1337'))}/>
                <Button icon="plus" onClick={() => this.addRandomProduct()}/>
            </Flex>
        );
    }
}
