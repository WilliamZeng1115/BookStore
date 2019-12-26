import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { GroupedButtons, GetOrDefault, IsMutationValid } from './Controls';
import { Mutation } from 'react-apollo'

export default function Form(props) {
  const attributes = GetOrDefault(props.attributes, {});
  const formSections = GetOrDefault(props.formSections, []);
  const submitButtonName = GetOrDefault(attributes.submitButtonName, "Submit");
  const onSubmit = GetOrDefault(attributes.onSubmit, null);
  if (onSubmit == null) throw "onSubmit is not set."

  return (
    <form onSubmit={onSubmit}>
      {formSections.map((el, index) => { return FormSection(el, index) })}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">{submitButtonName}</button>
      </div>
    </form>
  )
}

function FormSection(section, key) {
  const sectionName = GetOrDefault(section.name, "");
  const attributes = GetOrDefault(section.attributes, {});
  const sectionClass = GetOrDefault(attributes.class, "");
  const sectionTitle = sectionName === "" ? null : <label>{sectionName}</label>;
  const formItems = GetOrDefault(section.formItems, []);
  return (
    <div key={key} className={sectionClass}>
      {sectionTitle}
      {formItems.map(FormItem)}
    </div>
  )
}

function FormItem(item) {
  const name = GetOrDefault(item.name, "");
  if (name === "") return <div> Missing form item name </div>;
  const attributes = GetOrDefault(item.attributes, {});
  const itemType = GetOrDefault(attributes.ItemType, "TEXTBOX");
  const variant = GetOrDefault(attributes.variant, "outlined");
  const margin = GetOrDefault(attributes.margin, "normal");
  const className = GetOrDefault(attributes.class, "");
  const onChange = GetOrDefault(item.onChange, null);
  const displayName = GetOrDefault(attributes.displayName, name);
  var formItem;
  switch (itemType.toUpperCase()) {
    case "TEXTBOX":
      const type = GetOrDefault(attributes.type, "text");
      formItem = <TextField key={name} name={name} id={name} label={displayName} type={type} variant={variant} className={className} margin={margin} onChange={onChange} fullWidth={true}/>;
    default:
      break;
  }
  return (
    <div key={name}>
      {formItem}
    </div>
  )
}
