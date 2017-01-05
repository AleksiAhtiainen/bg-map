import React from 'react';
import update from 'react-addons-update';

import {omit} from 'lodash';

import uiColors from './uiColors.js';
import icons from './icons.js';
import config from './config.js';

import SVGIcon from './SVGIcon.jsx';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import {Map,Listing,Marker,InfoWindow} from 'google-maps-react';

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

class InfoWindowDetailsButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Remove onClick, since it won't work when rendered within InfoWindow anyway
        const buttonProps = omit(this.props, ['onClick']);

        return <Button {...buttonProps}/>
    }
}

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
                    _this.restyleRequired = false;
                    _this.map.restyleMap();
                }, 0);
            });
        }
    }


    mapIsReady(mapProps, map) {
        // Store the map reference to be able to call functions like setCenter
        this.state.map = map;

        map.panTo(config.startingPosition);
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
                    const fillColor = this.props.selections[group.id] ? uiColors.red : uiColors.yellow;
                    const icon =
                    {
                        path: icons.group.path,
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

        const linkContent = this.props.sideBarDetailLinksVisible ?
          <Card.Content extra>
            <InfoWindowDetailsButton color='black' size='medium' compact>
                <SVGIcon
                    path={icons.navigationChevronRightSmall.path }
                    inverted
                />
                menu
            </InfoWindowDetailsButton>
          </Card.Content>
          : <Card.Content extra>
            <InfoWindowDetailsButton color='black' size='medium' compact>
                <SVGIcon
                    path={icons.navigationChevronLeftSmall.path }
                    inverted
                />
            </InfoWindowDetailsButton>
          </Card.Content>
;

        const infoWindowContent = activeMarkerGroup ?
            <Card>
              <Card.Content>
                <Card.Header>{activeMarkerGroup.name}</Card.Header>
                <Card.Meta>{activeMarkerGroup.location.name}</Card.Meta>
                <Card.Description>{activeMarkerGroup.time}</Card.Description>
              </Card.Content>
              {linkContent}
            </Card>
            : <div>'N/A'</div>;

        // TODO: Really ugly way to handle  buttons in the non-DOM-rendered InfoWindow,
        // via raw JS code calling a globally visible function variable.
        // Change to react-google-maps component, perhaps it supports this more
        // directly!
        var _this = this;
        handleDetailsClicked = function(id) {
            if (_this.props.onDetailsRequested)
            {
                _this.props.onDetailsRequested(id);
            }
        };

        const infoWindow = (
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.infoWindowVisible}
                onOpen={this.infoWindowHasOpened.bind(this)}
                onClose={this.infoWindowHasClosed.bind(this)}

                onButtonClicksRawJS={activeMarkerGroup ? 'handleDetailsClicked(\''+activeMarkerGroup.id+'\')' : null}>

                {infoWindowContent}

            </InfoWindow>
        );


        return (
            <Map
                ref={(m) => { this.map = m; }}
                containerStyle={containerStyle}
                google={window.google}
                zoom={config.startingZoom}
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
    mapCenter: React.PropTypes.object.isRequired,
    sideBarDetailLinksVisible : React.PropTypes.bool,
    onDetailsRequested: React.PropTypes.func.isRequired
};

export default GroupMap;

