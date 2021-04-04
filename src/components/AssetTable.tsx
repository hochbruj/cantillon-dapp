import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useStore } from "../store/store";
import { Token } from "../sharedTypes/eth.types";
import { tokens } from "../config/ethData";
import {
  currentPrice,
  normalized,
  totalUsdBalance,
} from "../utilities/calculations";
import { formatPercentage, formatToUsd } from "../utilities/formatters";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: { padding: 0 },
  content: {
    padding: theme.spacing(2),
  },
  tokenContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
    height: 32,
    width: 32,
  },
}));

const AssetTable = () => {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { prices, balances, connectedWeb3 } = state;

  const assets = Object.keys(balances!).filter(
    (token) => balances![token as Token] !== "0"
  ) as [Token];

  const totalUsdAmount = totalUsdBalance(balances!, prices!);

  return (
    <Card className={classes.card}>
      <CardHeader title="Assets" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Asset class</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Allocation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((token: Token) => (
              <TableRow key={token}>
                <TableCell>
                  <div className={classes.tokenContainer}>
                    <img
                      className={classes.avatar}
                      src={`/tokens/${token}.png`}
                    />
                    <Typography variant="body1">{token}</Typography>
                  </div>
                </TableCell>
                <TableCell>{tokens[token as Token].name}</TableCell>
                <TableCell>{tokens[token as Token].assetClass}</TableCell>
                <TableCell align="right">
                  {normalized(balances![token], token)}
                </TableCell>
                <TableCell align="right">
                  {formatToUsd(
                    Number(normalized(balances![token], token)) *
                      currentPrice(prices!, token)
                  )}
                </TableCell>
                <TableCell align="right">
                  {formatPercentage(
                    (Number(normalized(balances![token], token)) *
                      currentPrice(prices!, token)) /
                      totalUsdAmount
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetTable;
