import React from 'react';

import uiColors from './uiColors.js';
import icons from './icons.js';

import SVGIcon from './SVGIcon.jsx';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

class GroupItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        const newSelectionValue = this.props.selected ? false : true;
        this.props.onSelectionToggle(this.props.group.id, newSelectionValue);
    }

    render() {
        const group = this.props.group;

        let links = [(group.forumUrl ? <a key='forumUrl' target='_blank' href={group.forumUrl}>keskustelufoorumi</a> : null)];
        if (group.homepageUrl) {
            links.push(links[0] ? <br key='br1' /> : null);
            links.push(<a key='homepageUrl' target='_blank' href={group.homepageUrl}>kotisivu</a>);
        }
        if (group.facebookUrl) {
            links.push(links[0] ? <br key='br2' /> : null);
            links.push(
                <a key='facebookUrl' target='_blank' href={group.facebookUrl}>
                    <Icon name='facebook'/>facebook
                </a>
            );
        }
        if (group.twitterUrl) {
            links.push(links[0] ? <br key='br3' /> : null);
            links.push(
                <a key='twitterUrl' target='_blank' href={group.twitterUrl}>
                    <Icon name='twitter'/>twitter
                </a>
            );
        }

        return (

            <Item key={group.id}>

                <Item.Content>
                    <Item.Header>
                        {group.name}
                    </Item.Header>

                    <Item.Meta>
                        <Button basic
                            floated='right'
                            size='small'
                            onClick={this.onToggle.bind(this)}>
                                <Image>
                                    <SVGIcon
                                        color={this.props.selected ? uiColors.red : uiColors.yellow}
                                        path={icons.groupSmall.path}
                                        size={24}/>
                                </Image>
                        </Button>
                        {group.location.name}
                        <br/>{group.location.district + ', ' + group.location.city}
                        <br/>{group.time}
                    </Item.Meta>

                    <Item.Description>
                        {links}
                    </Item.Description>

                    <Item.Extra>
                        {group.location.streetAddress}, {group.location.city}
                        {/*}
                        <br/>lat: {group.location.position.lat}, lng: {group.location.position.lng}
                        */}
                    </Item.Extra>

                </Item.Content>

            </Item>
        );
    }
}

GroupItem.propTypes = {
    group: React.PropTypes.object.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
};

class GroupItems extends React.Component {

    constructor(props) {
        super(props);
    }

    renderGroup(group) {
        return (
                <GroupItem key={group.id} group={group} selected={this.props.selections[group.id]} onSelectionToggle={this.props.onSelectionToggle.bind(this)}/>
        );
    }

    render() {
        const groups = this.props.groups.map((group) => { return this.renderGroup(group); });
        return (
            <Item.Group relaxed>
                {groups}
            </Item.Group>
        );
    }
}

GroupItems.propTypes = {
    groups: React.PropTypes.array.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selections: React.PropTypes.array.isRequired
};

export default GroupItems;
