import React from 'react';
import update from 'react-addons-update';

import uiColors from './uiColors.js';
import icons from './icons.js';
import config from './config.js';
import data from './data.js';

import SVGIcon from './SVGIcon.jsx';
import GroupMap from './GroupMap.jsx';
import SideBar from './SideBar.jsx';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

class RegularGroupApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selections: [], menuIsOpen: false, mapCenter: config.startingPosition};
    }

    onGroupSelectionToggle(id, selected) {
        // Clear all previous selections
        var selections = [];
        selections[id] = selected;

        this.setState({
            selections: selections
        });
    }

    onGroupSelectionToggleWithCenterMap(id, selected) {
        this.onGroupSelectionToggle(id, selected);

        if (selected) {
            this.setState({
                mapCenter: data.regularGroups.find((g) => { return g.id==id;}).location.position
            })
        }
    }

    handleMenuClick() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
        // Restyle the map.
        this.groupMap.restyleMap();
    }

    handleGroupDetailsRequested(id)
    {
        if (!this.state.menuIsOpen)
        {
            // Select the item, centering seems to mess with the map for now, so skipped
            this.onGroupSelectionToggle(id, true);
        }

        // Open/close the menu
        this.handleMenuClick();
    }

    render() {
        const gridStyle = {
            height: "100%"
        }

        const floatStyle =
        {
            position: 'absolute',
            top: 25,
            left: 20
        };

        // On tablets and computers menu takes half the screen. On mobile, full screen.
        const mapGridWidthMobile = 16;
        const mapGridWidthTablet = this.state.menuIsOpen ? 8 : 16;
        const mapGridWidthComputer = this.state.menuIsOpen ? 8 : 16;

        const menuColumn = this.state.menuIsOpen ?
            (<Grid.Column mobile={16} tablet={8} computer={8}>
                <SideBar
                    groups={data.regularGroups}
                    selections={this.state.selections}
                    onSelectionToggle={this.onGroupSelectionToggleWithCenterMap.bind(this)}
                    onClose={this.handleMenuClick.bind(this)}
                />
            </Grid.Column>)
            : null;

        const zStyle =
        {
            zIndex: 100
        };

        // Change button icon and visibility of label based on whether menu is open
        const menuButtonProps = {
            style: floatStyle,
            onClick: this.handleMenuClick.bind(this),
            size: 'large',
            color: 'black',
        };

        return (
                <Grid style={gridStyle}>
                    {menuColumn}
                    <Grid.Column
                        mobile={mapGridWidthMobile}
                        tablet={mapGridWidthTablet}
                        computer={mapGridWidthComputer}>
                        <GroupMap
                            ref={(m) => { this.groupMap = m; }}
                            mapCenter={this.state.mapCenter}
                            groups={data.regularGroups}
                            selections={this.state.selections}
                            onSelectionToggle={this.onGroupSelectionToggle.bind(this)}
                            sideBarDetailLinksVisible={!this.state.menuIsOpen}
                            onDetailsRequested={this.handleGroupDetailsRequested.bind(this)}
                        />
                        <Button {...menuButtonProps}>
                            <SVGIcon
                                path={this.state.menuIsOpen ? icons.navigationChevronLeftSmall.path : icons.navigationChevronRightSmall.path }
                                inverted
                            />
                            {this.state.menuIsOpen ? null : 'menu'}
                        </Button>
                    </Grid.Column>
                </Grid>
        );
    }
}

export default RegularGroupApp;
