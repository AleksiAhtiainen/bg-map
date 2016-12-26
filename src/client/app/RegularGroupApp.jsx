import React from 'react';
import uuid from 'uuid';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';

import {Map,Listing,Marker,InfoWindow} from 'google-maps-react'

const groupIconSVGPath = require('svg-path-loader!material-design-icons/social/svg/production/ic_group_48px.svg');

const menuIconSVG = require('svg-path-loader!material-design-icons/navigation/svg/production/ic_menu_48px.svg');

const menuIcon = 'material-design-icons/navigation/svg/production/ic_menu_24px.svg';

class GroupListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        const newSelectionValue = this.props.selected ? false : true;
        this.props.onSelectionToggle(this.props.group.id, newSelectionValue);
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

const juttutupa =
    {lat: 60.178879, lng: 24.947472};

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

        this.state = { activeMarker: undefined, activeMarkerId: undefined, infoWindowVisible: false };

    }

    mapIsReady(mapProps, map) {
    }

    mapClicked(mapProps, map, clickEvent) {
    }

    centerMoved(mapProps, map) {
    }

    mouseoverMarker(props, marker, e) {
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

        console.log('infoWindow', infoWindow);

        return (
            <Map
                containerStyle={containerStyle}
                google={window.google}
                zoom={14}
                initialCenter={juttutupa}
                onReady={this.mapIsReady}
                onClick={this.mapClicked}
                onDragend={this.centerMoved}
                visible={true}>
                {groupMarkers}
                {infoWindow}

            </Map>
        );
    }
}

GroupMap.propTypes = {
    groups: React.PropTypes.array.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selections: React.PropTypes.array.isRequired
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

        this.state = { selections: [], menuIsOpen: false};
    }

    onGroupSelectionToggle(id, selected) {
        // Clear all previous selections
        var selections = [];
        selections[id] = selected;

        this.setState({
            selections: selections
        });
    }

    handleMenuClick() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
    }

    render() {
        const gridStyle = {
            height: "100%"
        }

        const floatStyle =
        {
            position: 'absolute',
            top: 10,
            right: 10
        };


        return (
            <div>
                <Grid style={gridStyle}>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <GroupList groups={regularGroups} selections={this.state.selections} onSelectionToggle={this.onGroupSelectionToggle.bind(this)}/>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <GroupMap groups={regularGroups} selections={this.state.selections} onSelectionToggle={this.onGroupSelectionToggle.bind(this)}/>
                    </Grid.Column>
                </Grid>
                <div style={floatStyle}>
                    <Button toggle active={this.state.menuIsOpen} onClick={this.handleMenuClick.bind(this)}>
                        <Image src={menuIcon} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default RegularGroupApp;
