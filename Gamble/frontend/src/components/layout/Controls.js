import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export function LinkButton(props) {
  const displayName = props.displayName === null || props.displayName === undefined || props.displayName.trim() === "" ? props.value : props.displayName;
  return (
    <a className={props.className} id={"linkButton" + props.value} href={props.href}>{displayName}</a>
  )
}

export function DropDownButton(props) {
  const ddlID = props.id + "-dropdown-menu";
  const onClickElements = [];
  if (props.onClickElements !== undefined && props.onClickElements !== null) {
    for (const [index, el] of props.onClickElements.entries()) {
      onClickElements.push(<button key={index} onClick={el["onClick"]} className="dropdown-item">{el["name"]}</button>)
    }
  }
  const ddlItems = [];
  if (props.dropDownElements !== undefined && props.dropDownElements !== null) {
    for (const [index, el] of props.dropDownElements.entries()) {
      ddlItems.push(<Link key={index} className="dropdown-item" name={el["name"]} to={el["href"]}>{el["name"]}</Link>)
    }
  }
  const icon = GetOrDefault(props.icon, null);
  return (
    <div className="dropdown">
      <a className={props.className} id={props.id} href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          { icon === null ? props.name : icon }
      </a>
      <div className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby={props.id} id={ddlID}>
        {ddlItems}
        {onClickElements}
      </div>
    </div>
  )
}

export function GroupedButtons(props) {
  const attributes = GetOrDefault(props.attributes, {});
  const variant = GetOrDefault(attributes.variant, "outlined");
  const size = GetOrDefault(attributes.buttonSize, "medium");
  const color = GetOrDefault(attributes.color, "secondary");
  const aria_label = `${size} contained ${color} button group`;
  const buttons = GetOrDefault(props.buttons, []);
  if (buttons.length === 0) return (<div></div>);
  const onClickElements = [];
  for (const [index, el] of buttons.entries()) {
    el.attributes = GetOrDefault(el.attributes, {});
    el.attributes.color = GetOrDefault(el.attributes.color, color);
    el.attributes.size = GetOrDefault(attributes.buttonSize, GetOrDefault(el.attributes.size, "medium"))
    el.attributes.variant = GetOrDefault(attributes.variant, variant);
    const button = ButtonBuilder(index, el);
    if (button !== null) onClickElements.push(button);
    //onClickElements.push(<Button key={index} color={el.attributes.color} onClick={null} size={el.attributes.size}>{el.name}</Button>)
  }

  return (
    <ButtonGroup variant={"outlined"} color={color} size={size} aria-label={aria_label}>
      {onClickElements}
    </ButtonGroup>
  )
}

export function GridDataRowBuilder(columns, element, buttonActionGroup) {
  const row = {};
  const buttonsActions = GetOrDefault(buttonActionGroup, {});
  columns.forEach((col) => {
    if (col.toLowerCase().includes("action")) {
      row[col] = GetOrDefault(buttonsActions[col], null);
    } else {
      const keys = col.split(" ");
      keys[0] = keys[0].toLowerCase();
      row[col] = element[keys.join("")];
    }
  });
  return row;
}

function ButtonBuilder(index, element) {
  const attributes = GetOrDefault(element.attributes, {});
  const action = GetOrDefault(element.action, null)
  return (
    <Button key={index} variant={attributes.variant} onClick={action} color={attributes.color} size={attributes.size}>{element.name}</Button>
  )
}

export function IsMutationValid(mutations) {
  return mutations.mutation !== undefined && mutations.mutation !== null
      && mutations.variables !== undefined && mutations.variables !== null;
}

export function GetOrDefault(value, defaultValue) {
  return value !== undefined && value !== null ? value : defaultValue;
}
