import React from 'react';
import uuid from 'uuid';
//import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import Map from 'google-maps-react'

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

class GroupMap extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <Map google={window.google} zoom={14}>
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
        return (
            <Grid>
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
