import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import WorkOutlined from '@material-ui/icons/WorkOutline';

import '../AllPosition/CandidateList/CandidateListOnSearch.css';

import tileData from '../dummy/titleData';
// import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // marginLeft: '3%',
    // marginRight: '3%',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
    // marginRight: '1%'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={240} className={classes.gridList} cols={4}>
        {tileData.map(tile => (
          <div>
            <div className="profile">
              <div className="img-box">
                <img
                  src={tile.img}
                  alt={tile.title}
                  className="img-responsive"
                  height="42" width="80"
                />
                <div className="text-block">
                  <i className="material-icons ">card_travel</i>
                  <span className="label">3+ Years</span>
                </div>
              </div>
              <h1>Marrie Doi</h1>
              <span className="badge badge-info skills">HTML/CSS</span>
              <span className="badge badge-info skills">Java</span>
              <span className="badge badge-info skills">ReactJs</span>
              <br />
              <i className="material-icons Location">place</i>
              <span className="Location"> Tokyo, Japan</span>
            </div>
          </div>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
