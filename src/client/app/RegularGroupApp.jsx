import React from 'react';
import uuid from 'uuid';

class GroupListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.group.name}</span>
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
            <li key={group.id}><GroupListItem group={group} /></li>
        );
    }

    render() {
        const groups = this.props.groups.map((group) => { return this.renderGroup(group); });
        return (
            <div>
                <ul>
                   {groups}
                </ul>
            </div>
        );
    }
}

GroupList.propTypes = {
    groups: React.PropTypes.array.isRequired
};

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
            <GroupList groups={regularGroups}/>
        );
    }
}

export default RegularGroupApp;
