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

  // message: "<customer> has too much stocks of <SKU description> due to slowdown in rate of sale during lockdowns. <MSL> months of stock left. Discuss running a promotion with the buyer."

  const addNewItem = async(data) => {
    try{
      const result = await API.graphql(graphqlOperation(createItems,{input:data}));
      console.log(result);  
    }catch(error) {
      console.log('error on adding new item', error)
    }
  }

  return (
    <div className="App">
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
      value={formData.name}
      />
      
      <input
      onChange={e => setFormData({ ...formData, 'sku_desc': e.target.value})}
      placeholder="sku description"
      value={formData.name}
      />

      <input
      onChange={e => setFormData({ ...formData, 'value': e.target.value})}
      placeholder="value"
      value={formData.name}
      />


      <input
      onChange={e => setFormData({ ...formData, 'high': e.target.value})}
      placeholder="high"
      value={formData.name}
      />

      <input
      onChange={e => setFormData({ ...formData, 'low': e.target.value})}
      placeholder="low"
      value={formData.name}
      />

      <input
      onChange={e => setFormData({ ...formData, 'level': e.target.value})}
      placeholder="level"
      value={formData.name}
      />


      <input
      onChange={e => setFormData({ ...formData, 'message': e.target.value})}
      placeholder="message"
      value={formData.name}
      />


      <button onClick={()=>addNewItem(formData)}>
        Add Item
      </button>

      <button onClick={()=>deleteItems}>Delete Item</button>

      <button onClick={()=>updateItems}>Update Item</button>
        
      { orgs && orgs.map(org=>{
          return <p key={org.org}>{`${org.sku_number} || ${org.sku_desc} || ${org.org}`}</p>
        })}
        
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
