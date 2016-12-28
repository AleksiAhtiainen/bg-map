import React from 'react';
import uuid from 'uuid';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import {Map,Listing,Marker,InfoWindow} from 'google-maps-react'

const groupIconSVGPath = require('svg-path-loader!material-design-icons/social/svg/production/ic_group_48px.svg');
const groupIconSVGPathSmall = require('svg-path-loader!material-design-icons/social/svg/production/ic_group_24px.svg');
const navigationCloseIconSVGPathSmall = require('svg-path-loader!material-design-icons/navigation/svg/production/ic_close_24px.svg');
const actionStoreIconSVGPathSmall = require('svg-path-loader!material-design-icons/action/svg/production/ic_store_24px.svg');
const navigationChevronLeftIconSVGPathSmall = require('svg-path-loader!material-design-icons/navigation/svg/production/ic_chevron_left_24px.svg');
const navigationChevronRightIconSVGPathSmall = require('svg-path-loader!material-design-icons/navigation/svg/production/ic_chevron_right_24px.svg');
const socialPersonIconSVGPathSmall = require('svg-path-loader!material-design-icons/social/svg/production/ic_person_24px.svg');

const juttutupa =
    {lat: 60.178879, lng: 24.947472};
const juttutupa2 =
    {lat: 60.178879, lng: 24.950472};


class SVGIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image ui>
            <svg
                height={this.props.size}
                viewBox={'0 0 '+this.props.size+' '+this.props.size}
                width={this.props.size}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d={this.props.path}
                    fill={this.props.inverted ? this.props.invertedColor : this.props.color}
                />
            </svg>
            </Image>
        );
    }
}

SVGIcon.defaultProps = {
    size: 24,
    color: '#000',
    invertedColor: '#fff'
}

SVGIcon.propTypes = {
    path: React.PropTypes.string.isRequired,
    inverted: React.PropTypes.bool,
    size: React.PropTypes.number,
    color: React.PropTypes.string,
    invertedColor: React.PropTypes.string
};

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { activeItem: 'groups' };
    }

    handleItemClick(e, item) {
        if (item.name == 'close')
        {
            this.props.onClose();
        }
        else
        {
            this.setState({activeItem: item.name});
        }
    }

    render() {

        const sidebarNavData = [
            {
                name: 'groups',
                title: 'ryhmät',
                iconPath: groupIconSVGPathSmall,
                content:
                    <GroupList
                        groups={this.props.groups}
                        selections={this.props.selections}
                        onSelectionToggle={this.props.onSelectionToggle}
                    />
            },
            {
                name: 'gamers',
                title: 'pelaajat',
                iconPath: socialPersonIconSVGPathSmall,
                content:
                    <span>TODO</span>
            },
            {
                name: 'stores',
                title: 'kaupat',
                iconPath: actionStoreIconSVGPathSmall,
                content:
                    <span>TODO</span>
            }
        ];

        const activeItem = this.state.activeItem;

        const menuItems = sidebarNavData.map((d) => {
            const svg = <SVGIcon path={d.iconPath}/>;
            const content = (activeItem == d.name) ?
                (<div>{svg}{d.title}</div>)
                : (<div>{svg}</div>);
            const menuItem =
                <Menu.Item key={d.name} name={d.name} active={activeItem == d.name} onClick={this.handleItemClick.bind(this)}>
                    {content}
                </Menu.Item>
            return menuItem;
        });

        const activeContent = sidebarNavData.find((d) => { return d.name == activeItem;}).content;

        return (
            <Container>
                <Grid padded><Grid.Row><Grid.Column>

                <Menu attached={'top'} tabular >
                    {menuItems}

                    <Menu.Menu position={'right'}>
                        <Menu.Item name='close' active={activeItem == 'close'} onClick={this.handleItemClick.bind(this)}>
                            <SVGIcon path={navigationCloseIconSVGPathSmall}/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached={'bottom'}>
                    {activeContent}
                </Segment>
            </Grid.Column></Grid.Row></Grid>
            </Container>
        );
    }
}

SideBar.propTypes = {
    groups: React.PropTypes.array.isRequired,  // -> GroupList
    onSelectionToggle: React.PropTypes.func.isRequired,  // -> GroupList
    selections: React.PropTypes.array.isRequired,  // -> GroupList
    onClose: React.PropTypes.func.isRequired
};


class GroupListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        const newSelectionValue = this.props.selected ? false : true;
        this.props.onSelectionToggle(this.props.group.id, newSelectionValue, {centerMap: true});
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.group.name}</Table.Cell>
                <Table.Cell>{this.props.group.location.name}</Table.Cell>
                <Table.Cell>{this.props.group.time}</Table.Cell>
                <Table.Cell><Button onClick={this.onToggle.bind(this)}>{this.props.selected ? 'X' : '-'}</Button></Table.Cell>
            </Table.Row>
        );
    }
}

GroupListItem.propTypes = {
    group: React.PropTypes.object.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
};

class GroupList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderGroup(group) {
        return (
                <GroupListItem key={group.id} group={group} selected={this.props.selections[group.id]} onSelectionToggle={this.props.onSelectionToggle.bind(this)}/>
        );
    }

    render() {
        const groups = this.props.groups.map((group) => { return this.renderGroup(group); });
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Ryhmän nimi</Table.HeaderCell>
                        <Table.HeaderCell>Tapaamispaikka</Table.HeaderCell>
                        <Table.HeaderCell>Tapaamisaika</Table.HeaderCell>
                        <Table.HeaderCell>Valitse</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                   {groups}
                </Table.Body>
            </Table>
        );
    }
}

GroupList.propTypes = {
    groups: React.PropTypes.array.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selections: React.PropTypes.array.isRequired
};


class GroupMarker extends Marker {

    constructor(props) {
        super(props);
    }

    render() {

    }
}

GroupMarker.propTypes = {
    group: React.PropTypes.object.isRequired,
    isSelected: React.PropTypes.bool
};


class GroupMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = { activeMarker: undefined, activeMarkerId: undefined, infoWindowVisible: false, map: null };

        this.restyleRequired = false;

    }

    componentDidMountfunction() {
      this.restyleIfRequired();
    }

    componentDidUpdate() {
      this.restyleIfRequired();
    }

    restyleIfRequired() {
        if (this.restyleRequired) {
            var _this = this;
            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    // console.log('restyling', _this.map);
                    _this.restyleRequired = false;
                    _this.map.restyleMap();
                }, 0);
            });
        }
    }


    mapIsReady(mapProps, map) {
        // Store the map reference to be able to call functions like setCenter
        this.state.map = map;

        map.panTo(juttutupa2);
    }

    mapClicked(mapProps, map, clickEvent) {
    }

    centerMoved(mapProps, map) {
    }

    mouseoverMarker(props, marker, e) {
    }

    restyleMap() {
        // Need to restyle the map when the container's size changes...
        // See
        // http://stackoverflow.com/questions/26556436/react-after-render-code
        // for why this is implemented in so complex fashion: restyling must happen
        // only after rendering is actually done.
        this.restyleRequired = true;
    }

    clickMarker(props, marker, e) {
        const newSelectionValue = this.props.selections[props.id] ? false : true;

        // Enable/disable info window
        const newState =
            newSelectionValue ? {
                activeMarker: marker,
                activeMarkerId: props.id,
                infoWindowVisible: true
            } : {
                activeMarker: undefined,
                activeMarkerId: undefined,
                infoWindowVisible: false
            };

        if (this.state.activeMarkerId !== newState.activeMarkerId ||
            this.state.infoWindowVisible !== newState.infoWindowVisible) {
            this.setState(newState);
        }

        this.props.onSelectionToggle(props.id, newSelectionValue);
    }

    infoWindowHasOpened(props, infoWindow, e) {

    }

    infoWindowHasClosed(props, infoWindow, e) {
        const newState = {
            activeMarker: undefined,
            activeMarkerId: undefined,
            infoWindowVisible: false
        }

        this.setState(newState);
    }

    render() {
        const containerStyle = {
            position: 'relative',
            width: '100%',
            height: '100%'
        }

        const groupMarkers =
            this.props.groups.map((group) =>
                {
                    const fillColor = this.props.selections[group.id] ? 'red' : 'yellow';
                    const icon =
                    {
                        path: groupIconSVGPath,
                        fillColor: fillColor,
                        fillOpacity: 1.0,
                        scale: 1,
                        strokeColor: 'black',
                        strokeWeight: 2,
                        anchor: new google.maps.Point(24,24)
                    };
                    return (
                        <Marker
                            key={group.id}
                            id={group.id}
                            name={group.location.name}
                            position={group.location.position}
                            onMouseover={this.mouseoverMarker.bind(this)}
                            onClick={this.clickMarker.bind(this)}
                            icon={icon}
                            />
                        );
                });

        const activeMarkerGroup =
            this.props.groups.find((group) => { return group.id== this.state.activeMarkerId});


        const infoWindowContent = activeMarkerGroup ?
            <Card>
              <Card.Content>
                <Card.Header>{activeMarkerGroup.name}</Card.Header>
                <Card.Meta>{activeMarkerGroup.location.name}</Card.Meta>
                <Card.Description>{activeMarkerGroup.time}</Card.Description>
              </Card.Content>
            </Card>
            : <div>'N/A'</div>;

        const infoWindow = (
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.infoWindowVisible}
                onOpen={this.infoWindowHasOpened.bind(this)}
                onClose={this.infoWindowHasClosed.bind(this)}>

                {infoWindowContent}
            </InfoWindow>
        );

        // console.log('infoWindow', infoWindow);

        // centerAroundCurrentLocation={true}

        return (
            <Map
                ref={(m) => { this.map = m; }}
                containerStyle={containerStyle}
                google={window.google}
                zoom={14}
                center={this.props.mapCenter}
                onReady={this.mapIsReady.bind(this)}
                onClick={this.mapClicked.bind(this)}
                onDragend={this.centerMoved.bind(this)}
                visible={true}
                mapTypeControlOptions={{
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_RIGHT
                }}
                >
                {groupMarkers}
                {infoWindow}

            </Map>
        );
    }
}

GroupMap.propTypes = {
    groups: React.PropTypes.array.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selections: React.PropTypes.array.isRequired,
    mapCenter: React.PropTypes.object.isRequired
};


const regularGroups = [
    {
        id: uuid.v4(),
        name: 'Sunnuntaipelaajat',
        location: {
            name: 'Juttutupa',
            position: {lat: 60.178879, lng: 24.947472},
        },
        time: 'Sunnuntaisin klo 13'
    },
    {
        id: uuid.v4(),
        name: 'Sunnuntaipelaajat2',
        location: {
            name: 'Juttutupa2',
            position: {lat: 60.179879, lng: 24.949472},
        },
        time: 'Sunnuntaisin klo 13:30'
    }
];

class RegularGroupApp extends React.Component {

    constructor(props) {
        super(props);


        this.state = { selections: [], menuIsOpen: false, mapCenter: juttutupa};
    }

    onGroupSelectionToggle(id, selected, options) {
        // Clear all previous selections
        var selections = [];
        selections[id] = selected;

        this.setState({
            selections: selections
        });

        if (options && options.centerMap && selected) {
            this.setState({
                mapCenter: regularGroups.find((g) => { return g.id==id;}).location.position
            })
        }
    }

    handleMenuClick() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
        // Restyle the map.
        this.groupMap.restyleMap();
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
                    groups={regularGroups}
                    selections={this.state.selections}
                    onSelectionToggle={this.onGroupSelectionToggle.bind(this)}
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
            <div>
                <Grid style={gridStyle}>
                    {menuColumn}
                    <Grid.Column
                        mobile={mapGridWidthMobile}
                        tablet={mapGridWidthTablet}
                        computer={mapGridWidthComputer}>
                        <GroupMap
                            ref={(m) => { this.groupMap = m; }}
                            mapCenter={this.state.mapCenter}
                            groups={regularGroups}
                            selections={this.state.selections}
                            onSelectionToggle={this.onGroupSelectionToggle.bind(this)}
                        />
                        <Button {...menuButtonProps}>
                            <SVGIcon
                                path={this.state.menuIsOpen ? navigationChevronLeftIconSVGPathSmall : navigationChevronRightIconSVGPathSmall }
                                inverted
                            />
                            {this.state.menuIsOpen ? null : 'menu'}
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default RegularGroupApp;
