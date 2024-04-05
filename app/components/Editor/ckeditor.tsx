import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import MyCustomUploadAdapterPlugin from './MyUploadAdapter';
import React from 'react';

const editorConfiguration = {
    toolbar: [
		'heading',
		'bold',
		'italic',
		'link',
		'bulletedList',
		'numberedList',
		'|',
		'outdent',
		'indent',
		'|',
		'blockQuote',
		'insertTable',
		'mediaEmbed',
		'undo',
		'redo',
		'imageInsert',
		'codeBlock',
		'code'
    ],
	extraPlugins: [MyCustomUploadAdapterPlugin]
};

function CustomEditor(props: { initialData: string | null | undefined; updateContent: (content: string) => void }) {
	const onChange = (event: any, editor: { getData: () => any; }) => {
	  const data = editor.getData();
	  props.updateContent(data); // Update content in parent component
	};
  
	return (
		<div style={{ width: '1400px', maxWidth: '100%', marginTop: '20px' }}> 
		<CKEditor
			editor={Editor}
			config={editorConfiguration}
			data={props.initialData}
			onChange={onChange}
		/>
	  </div>
	);
  }
  
  export default CustomEditor;