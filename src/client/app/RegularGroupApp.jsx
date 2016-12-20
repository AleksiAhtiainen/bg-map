import React from 'react';
import uuid from 'uuid';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import {Map,Listing} from 'google-maps-react'

class GroupListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.group.name}</Table.Cell>
                <Table.Cell>{this.props.group.location}</Table.Cell>
                <Table.Cell>{this.props.group.time}</Table.Cell>
            </Table.Row>
        );
    }
}

GroupListItem.propTypes = {
    group: React.PropTypes.object.isRequired
};

class GroupList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderGroup(group) {
        return (
                <GroupListItem key={group.id} group={group} />
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
    groups: React.PropTypes.array.isRequired
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

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }

        return (
            <Map
                style={style}
                google={window.google}
                zoom={14}
                initialCenter={juttutupa}
                onReady={this.mapIsReady}
                onClick={this.mapClicked}
                onDragend={this.centerMoved}
                visible={true}>

            </Map>
        );
    }
}

const regularGroups = [
{
    id: uuid.v4(),
    name: 'Sunnuntaipelaajat',
    location: 'Juttutupa',
    time: 'Sunnuntaisin klo 13'
}
];

class RegularGroupApp extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const gridStyle = {
            height: "100%"
        }
        return (
            <Grid style={gridStyle}>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <GroupList groups={regularGroups}/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <GroupMap/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default RegularGroupApp;
