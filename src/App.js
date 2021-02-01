import Amplify , { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect } from 'react';
import { listItems } from './graphql/queries';
import {createItems, deleteItems, updateItems} from './graphql/mutations';

Amplify.configure(awsconfig);

function App() {
  const [orgs, setOrgs] = useState(null);
  const [formData, setFormData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [editableId, setEditableId] = useState(null);

  useEffect(()=>{
    if(!orgs){
      fetchOrgs();
    } else {
      console.log(orgs);
    }
  },[orgs]);

  const fetchOrgs = async() => {
    try{
      const data = await API.graphql(graphqlOperation(listItems));
      const list = data.data.listItems.items;
      setOrgs(list);      
    } catch (error) {
      console.log('error on fetching items', error);
    }
  }

  const addNewItem = async(data) => {
    try{
      const result = await API.graphql(graphqlOperation(createItems,{input:data}));
      const newItems = [...orgs, result.data.createItems];
      setOrgs(newItems);
      console.log(result);  
    }catch(error) {
      console.log('error on adding new item', error)
    }
  }

  const deleteItem = async(item) => {
    try{
      const result = await API.graphql(graphqlOperation(deleteItems,{input:item}))
      const newItems = orgs.filter(o=>o.org !== result.data.deleteItems.org);
      setOrgs(newItems);
      console.log(result.data.deleteItems);
    }catch(error) {
      console.log('error on deleting item', error.error)
    }

  }

  const updateItem = async(item) => {
    try{
      const result = await API.graphql(graphqlOperation(updateItems,{input:item}));
      console.log(result.data);
    }catch(error) {
      console.log('error on updating item', error.errors)
    }

    if(setEditableId){
      setEditableId(null);
      fetchOrgs();

    }
  }

  return (
    <div className="App">
    <AmplifySignOut/>
      <header className="App-header">     
        <input
          onChange={e => setFormData({ ...formData, 'org': e.target.value})}
          placeholder="org"
          value={formData.description}
        />

        <input
        onChange={e => setFormData({ ...formData, 'customer': e.target.value})}
        placeholder="customer"
        value={formData.name}
        />

        <input
        onChange={e => setFormData({ ...formData, 'sku_number': e.target.value})}
        placeholder="sku number"
        value={formData.sku_number}
        />
        
        <input
        onChange={e => setFormData({ ...formData, 'sku_desc': e.target.value})}
        placeholder="sku description"
        value={formData.sku_desc}
        />

        <input
        onChange={e => setFormData({ ...formData, 'value': e.target.value})}
        placeholder="value"
        value={formData.value}
        />

        <input
        onChange={e => setFormData({ ...formData, 'high': e.target.value})}
        placeholder="high"
        value={formData.high}
        />

        <input
        onChange={e => setFormData({ ...formData, 'low': e.target.value})}
        placeholder="low"
        value={formData.low}
        />

        <input
        onChange={e => setFormData({ ...formData, 'level': e.target.value})}
        placeholder="level"
        value={formData.level}
        />

        <input
        onChange={e => setFormData({ ...formData, 'message': e.target.value})}
        placeholder="message"
        value={formData.message}
        />
        
      <button onClick={()=>addNewItem(formData)}>Add Item</button>
      <hr/>
      </header>
      { orgs && orgs.map((org,index) => {
        return <React.Fragment key={org.org}>
        <br/>
          {
            Object.entries(org).map(([k,v]) => {
              return editableId === index && k !=='org'? 
              <input
                onChange={e => {
                  let key = k;
                  let val = e.target.value
                  let obj  = {};
                  obj[key] = val;
                  setItemData({ ...itemData, ...obj})
                }}
                placeholder={k}
                value={itemData[k]?itemData[k]:v} 
                key={k}
                />
              : <p key={k}>{`${k}:${v}`}</p>
            })
          }
          <button onClick={()=>deleteItem(org)}>Delete</button>
          <button onClick={()=>{
            console.log({...org, ...itemData});
            editableId===index ? updateItem({...org, ...itemData}):setEditableId(index)
            }}>
              {editableId===index ? 'Update Item':'Edit Item'}
          </button>
        </React.Fragment>
      })}      
    </div>
  );
}

export default withAuthenticator(App);
