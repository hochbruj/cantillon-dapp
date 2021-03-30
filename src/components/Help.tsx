import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Help() {
  const classes = useStyles();

  return (
    <div className={classes.icon}>
      <Tooltip
        title="Total ETH balance in USD. For testing purpose we set the ETH price 100x the actual price."
        placement="top-end"
      >
        <HelpIcon />
      </Tooltip>
    </div>
  );
}
