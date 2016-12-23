import React from 'react';
import uuid from 'uuid';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import {Map,Listing,Marker} from 'google-maps-react'

class GroupListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        const newSelectionValue = this.props.selected ? false : true;
        console.log('GroupListItem.toggle', newSelectionValue);
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

class GroupMap extends React.Component {

    constructor(props) {
        super(props);
    }

    mapIsReady(mapProps, map) {
        console.log('mapIsReady');
        // ...
    }

    mapClicked(mapProps, map, clickEvent) {
        console.log('mapClicked', clickEvent);
        // ...
    }

    centerMoved(mapProps, map) {
        console.log('centerMoved');
        // ...
    }

    mouseoverMarker(props, marker, e) {
        console.log('mouseoverMarker', props, marker, e);
    }

    clickMarker(props, marker, e) {
        console.log('clickMarker', props, marker, e);
    }

    renderGroupMarker(group) {
        return (
                <Marker key={group.id}
                    id={group.id}
                    name={group.location.name}
                    position={group.location.position}
                    onMouseover={this.mouseoverMarker}
                    onClick={this.clickMarker}
                    />
        );
    }


    render() {
        const containerStyle = {
            position: 'relative',
            width: '100%',
            height: '100%'
        }

        console.log('Selections', this.props.selections);
        const groupMarkers =
            this.props.groups.filter((group) => { return this.props.selections[group.id]; }).map((group) =>
                { return this.renderGroupMarker(group);
                });

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
}
];

class RegularGroupApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selections: []};
    }

    // TODO: add state for selected group. Pass callback to alter it to both the list and map, and
    // the value of it also down to both of them. This seems to the react way of handling UI state,
    // https://facebook.github.io/react/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live

    onGroupSelectionToggle(id, selected) {
        var selections = this.state.selections;

        selections[id] = selected;

        console.log('RegularGroupApp.onGroupSelectionToggle', id, selections);


        this.setState({
            selections: selections
        });
    }

    render() {
        const gridStyle = {
            height: "100%"
        }
        return (
            <Grid style={gridStyle}>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <GroupList groups={regularGroups} selections={this.state.selections} onSelectionToggle={this.onGroupSelectionToggle.bind(this)}/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <GroupMap groups={regularGroups} selections={this.state.selections} onSelectionToggle={this.onGroupSelectionToggle.bind(this)}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default RegularGroupApp;
