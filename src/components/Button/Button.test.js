import React from "react";
import { create } from "react-test-renderer";
import {Button} from "../index";

describe("Button component", () => {
    test("after creating component button should be diplayed", () => {
        const component = create(<Button />);
        const root = component.root;
        let button = root.findByType('button');
        expect(button).not.toBeNull()
    });
});