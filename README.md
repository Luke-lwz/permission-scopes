# PERMISSION-SCOPES  
Simple npm package to create permissions for users and convert them from an array of strings, to integers.  

```
npm i permission-scopes
```  

Initialization  
```js
const scopes = [ // create the permissions a user in your application can have
    "administrator", 
    "send_messages",
    "delete_messages",
    "upload_files"
];

const perms = new PermissionScopes(scopes); // initializes all the permissions
```


## USAGE   
  
Convert permission scopes to integer:
```js
perms.toInt([ 'administrator', 'send_messages', 'upload_files' ]) // Takes array as argument | return: 11
```
  
Convert permission integer to scopes:
```js
perms.toScopes(11) // Takes integer as argument | return: [ 'administrator', 'send_messages', 'upload_files' ]
```

Convert automatically:
```js
perms.convert(3) // return: [ 'administrator', 'send_messages' ]
perms.convert([ 'administrator', 'send_messages' ]) // return: 3
```
  
Get integer for all permissions: 
```js
perms.all(); // takes no argument | return (in this case): 15
```


If you want more features, just contact me on github :)