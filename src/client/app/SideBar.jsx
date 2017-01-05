import React from 'react';
import update from 'react-addons-update';

import {omit} from 'lodash';

import icons from './icons.js';
import config from './config.js';

import SVGIcon from './SVGIcon.jsx';
import GroupItems from './GroupItems.jsx';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

class SideBarMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Omit the path from the props to Menu.Item
        const menuItemProps = omit(this.props, ['path', 'title']);
        return (
            <Menu.Item {...menuItemProps}>
                <div>
                    <SVGIcon path={this.props.path}/>
                    {this.props.active ? this.props.title : null}
                </div>
           </Menu.Item>
        );
    }
}

SideBarMenuItem.propTypes = {
    path: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
}

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

        const activeItem = this.state.activeItem;

        const sideBarMenuItems = [
            <SideBarMenuItem
                path={icons.groupSmall.path}
                key={'groups'}
                name={'groups'}
                title={'ryhmät'}
                active={activeItem == 'groups'}
                onClick={this.handleItemClick.bind(this)} />,
            <SideBarMenuItem
                path={icons.socialPersonSmall.path}
                key={'gamers'}
                name={'gamers'}
                title={'pelaajat'}
                active={activeItem == 'gamers'}
                onClick={this.handleItemClick.bind(this)} />,
            <SideBarMenuItem
                path={icons.actionStoreSmall.path}
                key={'stores'}
                name={'stores'}
                title={'kaupat'}
                active={activeItem == 'stores'}
                onClick={this.handleItemClick.bind(this)} />
        ];

        const sideBarContent = activeItem == 'groups' ?
            <GroupItems
                groups={this.props.groups}
                selections={this.props.selections}
                onSelectionToggle={this.props.onSelectionToggle}
            />
            : <span>todo</span>

        return (
            <Container>
                <Grid padded><Grid.Row><Grid.Column>

                <Menu attached={'top'} tabular>

                    {sideBarMenuItems}

                    <Menu.Menu position={'right'}>
                        <Menu.Item name='close' active={activeItem == 'close'} onClick={this.handleItemClick.bind(this)}>
                            <SVGIcon path={icons.navigationCloseSmall.path}/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached={'bottom'}>
                    {sideBarContent}
                </Segment>

            </Grid.Column></Grid.Row></Grid>
            </Container>
        );
    }
}

SideBar.propTypes = {
    groups: React.PropTypes.array.isRequired,  // -> GroupTable
    onSelectionToggle: React.PropTypes.func.isRequired,  // -> GroupTable
    selections: React.PropTypes.array.isRequired,  // -> GroupTable
    onClose: React.PropTypes.func.isRequired
};

export default SideBar;
