import React from 'react';

import uiColors from './uiColors.js';
import icons from './icons.js';

import SVGIcon from './SVGIcon.jsx';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

class EventItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        const newSelectionValue = this.props.selected ? false : true;
        this.props.onSelectionToggle(this.props.event.id, newSelectionValue);
    }

    render() {
        const event = this.props.event;

        // TODO: smarter combination with <br>s in between if required
        let links = [(event.forumUrl ? <a key='forumUrl' target='_blank' href={event.forumUrl}>keskustelufoorumi</a> : null)];
        if (event.homepageUrl) {
            links.push(links[0] ? <br key='br1' /> : null);
            links.push(<a key='homepageUrl' target='_blank' href={event.homepageUrl}>kotisivu</a>);
        }
        if (event.vimpeliUrl) {
            links.push(<br key='br2' />);
            links.push(<a key='vimpeliUrl' target='_blank' href={event.vimpeliUrl}>vimpeli</a>);
        }

        return (

            <Item key={event.id}>

                <Item.Content>
                    <Item.Header>
                        {event.name}
                    </Item.Header>

                    <Item.Meta>
                        <Button basic
                            floated='right'
                            size='small'
                            onClick={this.onToggle.bind(this)}>
                                <Image>
                                    <SVGIcon
                                        color={this.props.selected ? uiColors.red : uiColors.yellow}
                                        path={icons.eventSmall.path}
                                        size={24}/>
                                </Image>
                        </Button>
                        {event.location.name}
                        <br/>{event.location.city}
                        <br/>{event.time}
                    </Item.Meta>

                    <Item.Description>
                        {links}
                    </Item.Description>

                    <Item.Extra>
                        {event.location.streetAddress}, {event.location.city}
                    </Item.Extra>

                </Item.Content>

            </Item>
        );
    }
}

EventItem.propTypes = {
    event: React.PropTypes.object.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
};

class EventItems extends React.Component {

    constructor(props) {
        super(props);
    }

    renderEvent(event) {
        return (
                <EventItem key={event.id} event={event} selected={this.props.selections[event.id]} onSelectionToggle={this.props.onSelectionToggle.bind(this)}/>
        );
    }

    render() {
        const events = this.props.events.map((event) => { return this.renderEvent(event); });
        return (
            <Item.Group relaxed>
                {events}
            </Item.Group>
        );
    }
}

EventItems.propTypes = {
    events: React.PropTypes.array.isRequired,
    onSelectionToggle: React.PropTypes.func.isRequired,
    selections: React.PropTypes.array.isRequired
};

export default EventItems;
