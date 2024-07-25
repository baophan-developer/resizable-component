import {PropsWithChildren, useEffect, useRef} from "react";
import "./App.css";

type ResizableComponentProps = {
	width?: string | number;
	height?: string | number;
};
const ResizableComponent = (props: PropsWithChildren<ResizableComponentProps>) => {
	const {children} = props;

	const resizerRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div>
			<div ref={mainRef} style={{}}>
				{children}
			</div>
			<div ref={resizerRef} style={{}} />
		</div>
	);
};

function App() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ResizableComponent>Resizable component...</ResizableComponent>
		</div>
	);
}

export default App;
