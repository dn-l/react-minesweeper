(this["webpackJsonpreact-minesweeper"]=this["webpackJsonpreact-minesweeper"]||[]).push([[0],{16:function(e,t,s){},17:function(e,t,s){},18:function(e,t,s){"use strict";s.r(t);var a,i=s(0),o=s(1),n=s.n(o),r=s(6),c=s.n(r),d=(s(16),s(2)),l=s(3),b=s(10),h=s(9),u=s(7),m=s(8),j=-1;!function(e){e.NotStarted="Game not started",e.Started="Game started",e.Lost="Game lost",e.Won="Game won"}(a||(a={}));var v,f=function(){function e(t){var s=t.rows,i=t.columns,o=t.bombs;Object(u.a)(this,e),this.state=a.NotStarted,this.board=[],this.bombs=0,this.maxCol=0,this.maxRow=0,this.nearbyHidden=0,this.maxCol=i-1,this.maxRow=s-1;var n=s*i-1;this.bombs=o>n?n:o}return Object(m.a)(e,[{key:"check",value:function(e){var t=Object(d.a)(e,2),s=t[0],i=t[1];switch(this.state){case a.Lost:case a.Won:break;case a.NotStarted:this.distributeBombs(s,i),this.state=a.Started,this.openCells(s,i);break;default:if(void 0!==this.board[s]&&this.board[s][i]===j)return this.state=a.Lost,this.state;this.openCells(s,i)}return this.state}},{key:"openCells",value:function(e,t){for(var s,i,o=[e,t];o.length>1;)if(i=o.pop(),s=o.pop(),void 0===this.board[s]&&(this.board[s]=[]),this.board[s][i]<j){if(this.board[s][i]=-1*this.board[s][i]-1,this.nearbyHidden--,0===this.nearbyHidden)return void(this.state=a.Won)}else void 0===this.board[s][i]&&(this.board[s][i]=0,s-1>=0&&(void 0===this.board[s-1]||void 0===this.board[s-1][i]||this.board[s-1][i]<j)&&o.push(s-1,i),s+1<=this.maxRow&&(void 0===this.board[s+1]||void 0===this.board[s+1][i]||this.board[s+1][i]<j)&&o.push(s+1,i),i-1>=0&&(void 0===this.board[s]||void 0===this.board[s][i-1]||this.board[s][i-1]<j)&&o.push(s,i-1),i+1<=this.maxCol&&(void 0===this.board[s]||void 0===this.board[s][i+1]||this.board[s][i+1]<j)&&o.push(s,i+1))}},{key:"distributeBombs",value:function(e,t){for(var s,a,i=this.bombs;i>0;)s=Math.floor(Math.random()*this.maxRow),a=Math.floor(Math.random()*this.maxCol),s===e&&a===t||void 0!==this.board[s]&&this.board[s][a]===j||(void 0===this.board[s]&&(this.board[s]=[]),this.board[s][a]<j&&this.nearbyHidden--,this.board[s][a]=j,this.initNearbyCells([s,a]),i--)}},{key:"initNearbyCells",value:function(e){for(var t=Object(d.a)(e,2),s=t[0],a=t[1],i=s-1;i<s+2;i++)for(var o=a-1;o<a+2;o++)if(!(i===s&&o===a||i<0||o<0||i>this.maxRow||o>this.maxCol))switch(void 0===this.board[i]&&(this.board[i]=[]),this.board[i][o]){case j:break;case void 0:this.board[i][o]=-2,this.nearbyHidden++;break;default:this.board[i][o]-=1}}}]),e}();function O(e,t){var s=t.type,a=t.payload;switch(s){case v.SetParams:return Object(l.a)(Object(l.a)({},e),{},{params:a,minesweeper:new f(a)});case v.Check:return e.minesweeper.check(a),Object(l.a)({},e);default:return e}}!function(e){e.SetParams="SET_PARAMS",e.Check="CHECK"}(v||(v={}));var x=Object(o.createContext)({state:{},dispatch:function(){return null}}),p={width:50,height:50};var w=function(e){var t=e.rowIndex,s=e.columnIndex,n=e.style,r=e.onClick,c=e.onContextMenu,d=e.flag,l=void 0!==d&&d,b=Object(o.useContext)(x).state.minesweeper,h=b.board[t]&&b.board[t][s],u=h;if(b.state===a.Lost||b.state===a.Won)switch(h===j&&(u="\ud83d\udca3"),h){case j:u="\ud83d\udca3";break;case 0:case void 0:u=void 0;break;default:h<j&&(u=-1*h-1)}else l&&(h<0||void 0===h)?u="\ud83d\udea9":(h<=j||0===h)&&(u=void 0);return Object(i.jsx)("div",{className:"cell",style:n,children:Object(i.jsx)("button",{"data-row":t,"data-column":s,style:p,className:"button",onClick:r,onContextMenu:c,disabled:0===h||h>0||b.state===a.Lost||b.state===a.Won,children:u})})};function C(e){return[parseInt(e.dataset.row,10),parseInt(e.dataset.column,10)]}var N=function(){var e=Object(h.a)(),t=e.ref,s=e.width,a=e.height,n=Object(o.useState)({}),r=Object(d.a)(n,2),c=r[0],u=r[1],m=Object(o.useContext)(x),j=m.state,f=j.params,O=j.minesweeper,p=m.dispatch;Object(o.useEffect)((function(){return u({})}),[O]);var N=function(e){var t=C(e.target),s=Object(d.a)(t,2),a=s[0],i=s[1];c[a]&&c[a][i]||p({type:v.Check,payload:[a,i]})},y=function(e){if("contextmenu"===e.type){e.preventDefault();var t=Object(l.a)({},c),s=C(e.target),a=Object(d.a)(s,2),i=a[0],o=a[1];t[i]||(t[i]={}),t[i][o]=!t[i][o],u(t)}};return Object(i.jsx)("div",{ref:t,className:"container full-height",children:s&&a&&Object(i.jsx)(b.a,{columnCount:f.columns,rowCount:f.rows,columnWidth:50,rowHeight:50,width:s,height:a,children:function(e){return Object(i.jsx)(w,Object(l.a)(Object(l.a)({},e),{},{flag:c[e.rowIndex]&&c[e.rowIndex][e.columnIndex],onClick:N,onContextMenu:y}))}})})},y=s(4);var g=function(e){var t=parseInt(e,10);return!t||t<0?0:t};var k=function(){var e,t=Object(o.useContext)(x),s=t.state,n=t.dispatch,r=Object(o.useState)(s.params),c=Object(d.a)(r,2),b=c[0],h=c[1],u=function(e){var t=e.target,s=t.id,a=t.value;h(Object(l.a)(Object(l.a)({},b),{},Object(y.a)({},s,g(a))))},m=Object.values(b).every((function(e){return e}));switch(s.minesweeper.state){case a.Lost:e="\ud83d\ude35";break;case a.Won:e="\ud83d\ude0e";break;default:e="\ud83d\ude00"}return Object(i.jsxs)("form",{className:"container pb-3",onSubmit:function(e){e.preventDefault(),m&&n({type:v.SetParams,payload:b})},children:[Object(i.jsxs)("div",{className:"columns",children:[Object(i.jsx)("div",{className:"column",children:Object(i.jsxs)("div",{className:"field",children:[Object(i.jsx)("label",{className:"label",htmlFor:"rows",children:"Rows"}),Object(i.jsx)("div",{className:"control",children:Object(i.jsx)("input",{id:"rows",name:"rows",type:"number",className:"input",autoComplete:"off",value:null===b||void 0===b?void 0:b.rows.toString(),onChange:u})})]})}),Object(i.jsx)("div",{className:"column",children:Object(i.jsxs)("div",{className:"field",children:[Object(i.jsx)("label",{className:"label",htmlFor:"columns",children:"Columns"}),Object(i.jsx)("div",{className:"control",children:Object(i.jsx)("input",{id:"columns",name:"columns",className:"input",autoComplete:"off",type:"number",value:null===b||void 0===b?void 0:b.columns.toString(),onChange:u})})]})}),Object(i.jsx)("div",{className:"column",children:Object(i.jsxs)("div",{className:"field",children:[Object(i.jsx)("label",{className:"label",htmlFor:"bombs",children:"Bombs"}),Object(i.jsx)("div",{className:"control",children:Object(i.jsx)("input",{id:"bombs",name:"bombs",className:"input",autoComplete:"off",type:"number",value:null===b||void 0===b?void 0:b.bombs.toString(),onChange:u})})]})})]}),Object(i.jsx)("div",{className:"has-text-centered",children:Object(i.jsx)("button",{className:"button is-primary is-large",disabled:!m,type:"submit",children:e})})]})},S=(s(17),{rows:1e3,columns:1e3,bombs:2e4}),M={params:S,minesweeper:new f(S)};var I=function(){var e=Object(o.useReducer)(O,M),t=Object(d.a)(e,2),s=t[0],a=t[1];return Object(i.jsx)(x.Provider,{value:{state:s,dispatch:a},children:Object(i.jsxs)("div",{className:"is-flex is-flex-direction-column game",children:[Object(i.jsx)("section",{className:"hero",children:Object(i.jsx)("div",{className:"hero-body",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)("h1",{className:"title",children:"Minesweeper Game"}),Object(i.jsx)("h2",{className:"subtitle",children:Object(i.jsx)("a",{href:"https://github.com/dn-l/react-minesweeper",children:"github.com/dn-l/react-minesweeper"})})]})})}),Object(i.jsx)("section",{children:Object(i.jsx)(k,{})}),Object(i.jsx)("section",{className:"is-flex-grow-1 pb-5",children:Object(i.jsx)(N,{})})]})})};var R=function(){return Object(i.jsx)(I,{})};c.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(R,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.4ab46aa7.chunk.js.map